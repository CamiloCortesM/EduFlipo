import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
export class Student {

  @ApiProperty({ example: '15', description: 'Student ID', uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Sofia', description: 'FirstName student'})
  @Column('text')
  firstName: string;

  @ApiProperty({ example: 'Perez', description: 'LastName student'})
  @Column('text')
  lastName: string;

  @ApiProperty({ example: 'example@google.com', description: 'LastName student',uniqueItems:true})
  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string;
}
