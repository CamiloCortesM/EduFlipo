import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';

import { Student } from 'src/students/entities/student.entity';
import { Class } from './entities/class.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';

@Injectable()
export class ClassesService {
  private readonly logger = new Logger('ClassesService');

  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const { className, description, teacherId, studentIds } = createClassDto;

    const newClass = this.classRepository.create({
      className,
      description,
    });

    if (teacherId) {
      const teacher = await this.teacherRepository.findOneBy({ id: teacherId });

      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }
      newClass.teacher = teacher;
    }

    if (studentIds && studentIds.length > 0) {
      const students = await this.studentRepository.findBy({
        id: In(studentIds),
      });

      const existingStudentIds = students.map((student) => student.id);
      const notFoundStudentIds = studentIds.filter(
        (id) => !existingStudentIds.includes(id),
      );

      if (notFoundStudentIds.length > 0) {
        console.warn(
          `The following student IDs were not found: ${notFoundStudentIds.join(', ')}`,
        );
      }

      newClass.students = students;
    }

    return this.classRepository.save(newClass);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const findOptions: FindManyOptions<Class> = {};

    if (paginationDto.limit !== undefined) {
      findOptions.take = limit;
    }

    if (paginationDto.offset !== undefined) {
      findOptions.skip = offset;
    }

    findOptions.relations = ['teacher', 'students'];
    const classes = await this.classRepository.find(findOptions);

    return classes.map((classEntity) => this.mapClassEntity(classEntity));
  }

  async findOne(id: number) {
    const queryBuilder = this.classRepository.createQueryBuilder('classEntity');
    const classEntity = await queryBuilder
      .leftJoinAndSelect('classEntity.teacher', 'teacher')
      .leftJoinAndSelect('classEntity.students', 'students')
      .where('classEntity.id = :id', { id })
      .getOne();

    if (!classEntity) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }

    return classEntity;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const { studentIds, teacherId, ...restUpdateClass } = updateClassDto;
    const existingClass = await this.classRepository.preload({
      id,
      ...restUpdateClass,
    });

    if (!existingClass)
      throw new NotFoundException(`Class with id ${id} not found`);

    const updatedClass = {
      ...existingClass,
      ...restUpdateClass,
    };

    try {
      await this.classRepository.save(updatedClass);
      return updatedClass;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const classEntity = await this.classRepository.findOneBy({ id });
    if (!classEntity)
      throw new NotFoundException(`Class with id ${id} not found`);
    await this.classRepository.remove(classEntity);
  }

  async assignTeacher(id: number, assignTeacherDto: AssignTeacherDto) {
    const classEntity = await this.classRepository.findOneBy({ id });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    const { teacherId } = assignTeacherDto;
    const teacher = await this.teacherRepository.findOneBy({ id: teacherId });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    classEntity.teacher = teacher;
    return this.classRepository.save(classEntity);
  }

  async assignStudentsToClass(
    id: number,
    assignStudentsDto: AssignStudentsDto,
  ) {
    const classEntity = await this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.students', 'students')
      .where('class.id = :id', { id })
      .getOne();

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    const { studentIds } = assignStudentsDto;
    const students = await this.studentRepository
      .createQueryBuilder('student')
      .where('student.id IN (:...studentIds)', { studentIds })
      .getMany();

    const existingStudentIds = classEntity.students.map(
      (student) => student.id,
    );
    const newStudentIds = studentIds.filter(
      (id) => !existingStudentIds.includes(id),
    );
    const newStudents = students.filter((student) =>
      newStudentIds.includes(student.id),
    );

    if (newStudents.length === 0) {
      throw new BadRequestException('No new students to add');
    }

    classEntity.students = [...classEntity.students, ...newStudents];
    return this.classRepository.save(classEntity);
  }

  async findStudents(id: number) {
    const classEntity = await this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.students', 'students')
      .where('class.id = :id', { id })
      .getOne();

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    return classEntity.students;
  }

  private mapClassEntity(classEntity: Class): any {
    const teacherName = classEntity.teacher
      ? this.getFullName(classEntity.teacher)
      : null;
    const studentNames =
      classEntity.students?.map((student) => this.getFullName(student)) ?? [];

    const teacher = teacherName
      ? {
          id: classEntity.teacher.id,
          name: teacherName,
        }
      : null;

    return {
      ...classEntity,
      teacher,
      students: studentNames,
    };
  }

  private getFullName(
    person: { firstName: string; lastName: string } | null,
  ): string {
    return person ? `${person.firstName} ${person.lastName}` : '';
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
