import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './entities/teacher.entity';
import { Class } from 'src/classes/entities/class.entity';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [TypeOrmModule.forFeature([Teacher,Class])],
  exports: [TypeOrmModule],
})
export class TeachersModule {}
