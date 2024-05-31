import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class AssignStudentsDto {
  @ApiProperty({
    description: 'Student ids to register for classes',
    nullable: false,
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  studentIds: number[];
}
