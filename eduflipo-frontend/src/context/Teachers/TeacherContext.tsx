import { createContext } from 'react';
import { ITeacher } from '../../interfaces/entities';

interface ContextProps {
  isLoaded: boolean;
  teachers: ITeacher[];

  //Methods
  createTeacher: (teacher: ITeacher) => void;
  editTeacher: (teacher: ITeacher) => void;
  deleteTeacher: (id: number) => void;
}

export const TeacherContext = createContext({} as ContextProps);
