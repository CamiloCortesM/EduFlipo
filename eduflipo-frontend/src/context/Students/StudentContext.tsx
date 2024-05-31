import { createContext } from 'react';
import { IStudent } from '../../interfaces/entities';

interface ContextProps {
  isLoaded: boolean;
  students: IStudent[];

    //Methods
  createStudent: (student: IStudent) => void;
  editStudent: (student: IStudent) => void;
  deleteStudent: (id: number) => void;
}

export const StudentContext = createContext({} as ContextProps);
