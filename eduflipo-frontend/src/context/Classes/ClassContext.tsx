import { createContext } from 'react';
import { IClass, IStudent } from '../../interfaces/entities';

interface ContextProps {
  isLoaded: boolean;
  classes: IClass[];
  studentsInClass: IStudent[];

  //Methods
  createClass: (newClass: IClass) => void;
  updateClass: (updatedClass: IClass) => void;
  deleteClass: (classId: number) => void;
  assignTeacher: (classId: number, teacherId: number) => void;
  assignStudents: (id: number, students: number[]) => void;
  viewAllStudentsOfClass: (id: number) => void;
}

export const ClassContext = createContext({} as ContextProps);
