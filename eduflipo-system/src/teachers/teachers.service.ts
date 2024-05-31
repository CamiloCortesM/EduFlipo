import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { Class } from 'src/classes/entities/class.entity';

@Injectable()
export class TeachersService {
  private readonly logger = new Logger('TeachersService');

  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = this.teacherRepository.create(createTeacherDto);
      await this.teacherRepository.save(teacher);

      return teacher;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const findOptions: FindManyOptions<Teacher> = {};

    if (limit !== undefined) {
      findOptions.take = limit;
    }

    if (offset !== undefined) {
      findOptions.skip = offset;
    }

    return this.teacherRepository.find(findOptions);
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher)
      throw new NotFoundException(`Teacher with id ${id} not found`);

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const existingTeacher = await this.teacherRepository.preload({
      id,
      ...updateTeacherDto,
    });

    if (!existingTeacher)
      throw new NotFoundException(`Teacher with id ${id} not found`);

    const updatedTeacher = {
      ...existingTeacher,
      ...updateTeacherDto,
    };

    try {
      await this.teacherRepository.save(updatedTeacher);
      return updatedTeacher;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const teacher = await this.teacherRepository.findOneBy({id});
    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${id} not found`);
    }
  
    const classes = await this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.students', 'students')
      .leftJoinAndSelect('class.teacher', 'teacher')
      .where('teacher.id = :id', { id })
      .getMany();
  
    for (const classEntity of classes) {
      classEntity.teacher = null;
      await this.classRepository.save(classEntity);
    }

    await this.teacherRepository.remove(teacher);
  }

  private handleDBExceptions(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException('Email already exists');
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
