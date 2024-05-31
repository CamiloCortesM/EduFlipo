import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    description: 'ClassName',
    nullable: false,
    required: true,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  className: string;

  @ApiProperty({
    description: 'Description class',
    nullable: false,
    required: true,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Assigned teacher',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  teacherId?: number;

  @ApiProperty({
    description: 'Enrol students',
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  studentIds?: number[];
}
