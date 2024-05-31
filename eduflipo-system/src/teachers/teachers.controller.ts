import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { Teacher } from './entities/teacher.entity';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Teacher was created', type:Teacher})
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email exists' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of teachers', type: [Teacher] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.teachersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Teacher found', type: Teacher })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Teacher updated', type: Teacher })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Teacher removed' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.remove(id);
  }
}
