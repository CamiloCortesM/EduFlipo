import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';

import { Class } from './entities/class.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Student } from 'src/students/entities/student.entity';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [TypeOrmModule.forFeature([Class, Teacher, Student])],
  exports: [TypeOrmModule],
})
export class ClassesModule {}
