import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity({ name: 'classes' })
export class Class {
  @ApiProperty({ example: '15', description: 'Classes ID', uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Math', description: 'ClassName' })
  @Column()
  className: string;

  @ApiProperty({
    example: 'Sum and Multiplication',
    description: 'Description class',
  })
  @Column()
  description: string;

  @ApiProperty({
    type: () => Teacher,
    description: 'The teacher assigned to the class',
  })
  @ManyToOne(() => Teacher, (teacher) => teacher.classes, { eager: true })
  teacher?: Teacher;

  @ApiProperty({
    type: () => [Student],
    description: 'The students enrolled in the class',
  })
  @ManyToMany(() => Student, { eager: true })
  @JoinTable()
  students?: Student[];
}
