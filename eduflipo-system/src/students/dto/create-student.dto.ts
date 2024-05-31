import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student FirstName',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Student LastName',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Student Email',
    nullable: false,
    uniqueItems:true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
