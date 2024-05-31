import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description:'Teacher FirstName',
    nullable:false,
    minLength:1
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description:'Teacher LastName',
    nullable:false,
    minLength:1
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  lastName: string;
  
  @ApiProperty({
    description:'Teacher Email',
    nullable:false,
    uniqueItems:true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}