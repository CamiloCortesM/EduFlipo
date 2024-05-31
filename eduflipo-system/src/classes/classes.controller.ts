import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ClassesService } from './classes.service';

import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { Class } from './entities/class.entity';
import { Student } from 'src/students/entities/student.entity';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Class was created', type: Class })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of classes', type: [Class] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.classesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Class found', type: Class })
  @ApiResponse({ status: 404, description: 'Class not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Class updated', type: Class })
  @ApiResponse({ status: 404, description: 'Class not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Class removed' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.remove(id);
  }

  @Post(':id/assign-teacher')
  @ApiResponse({
    status: 200,
    description: 'Teacher assigned to class',
    type: Class,
  })
  @ApiResponse({ status: 404, description: 'Class or teacher not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  assignTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTeacherDto: AssignTeacherDto,
  ) {
    return this.classesService.assignTeacher(id, assignTeacherDto);
  }

  @Post(':id/assign-students')
  @ApiResponse({
    status: 200,
    description: 'Students assigned to class',
    type: Class,
  })
  @ApiResponse({ status: 404, description: 'Class or students not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  assignStudents(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignStudentsDto: AssignStudentsDto,
  ) {
    return this.classesService.assignStudentsToClass(id, assignStudentsDto);
  }

  @Get(':id/students')
  @ApiResponse({ status: 200, description: 'List of students in class', type: [Student] })
  @ApiResponse({ status: 404, description: 'Class not found' })
  findStudents(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findStudents(id);
  }
}
