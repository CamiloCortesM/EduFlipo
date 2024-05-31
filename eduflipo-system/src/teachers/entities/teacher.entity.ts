import { ApiProperty } from '@nestjs/swagger';
import { Class } from 'src/classes/entities/class.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'teachers' })
export class Teacher {
  @ApiProperty({ example: '15', description: 'Teacher ID', uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Camilo', description: 'FirstName teacher' })
  @ApiProperty()
  @Column('text')
  firstName: string;

  @ApiProperty({ example: 'Cortes', description: 'LastName teacher' })
  @ApiProperty()
  @Column('text')
  lastName: string;

  @ApiProperty({
    example: 'example@google.com',
    description: 'Email teacher',
    uniqueItems: true,
  })
  @ApiProperty()
  @Index({ unique: true })
  @Column()
  email: string;

  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classes: Class[];
}
