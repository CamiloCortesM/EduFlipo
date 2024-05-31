import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { Student } from './entities/student.entity';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Student was created', type: Student })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of students', type: [Student] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.studentsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Student found', type: Student })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Student updated', type: Student })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Student removed' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}
