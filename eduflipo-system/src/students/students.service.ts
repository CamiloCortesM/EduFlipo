import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger('StudentsService');

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = this.studentRepository.create(createStudentDto);
      await this.studentRepository.save(student);

      return student;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset} = paginationDto;

    const findOptions: FindManyOptions<Student> = {};

    if (limit !== undefined) {
      findOptions.take = limit;
    }

    if (offset !== undefined) {
      findOptions.skip = offset;
    }

    return this.studentRepository.find(findOptions);
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student)
      throw new NotFoundException(`Student with id ${id} not found`);

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepository.preload({
      id,
      ...updateStudentDto,
    });

    if (!existingStudent)
      throw new NotFoundException(`Student with id ${id} not found`);

    const updatedTeacher = {
      ...existingStudent,
      ...updateStudentDto,
    };

    try {
      await this.studentRepository.save(updatedTeacher);
      return updatedTeacher;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student)
      throw new NotFoundException(`Student with id ${id} not found`);
    await this.studentRepository.remove(student);
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
