import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AssignTeacherDto {
  @ApiProperty({
    description: 'Teacher id to assign to the class',
    nullable: false,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  teacherId: number;
}
