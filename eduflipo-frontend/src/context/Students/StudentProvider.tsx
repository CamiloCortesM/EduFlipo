import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { StudentContext, studentReducer } from './';
import { IStudent } from '../../interfaces/entities';
import api from '../../api';

export interface StudentState {
  isLoaded: boolean;
  students: IStudent[];
}

const Student_INITIAL_STATE: StudentState = {
  isLoaded: false,
  students: [],
};

export const StudentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, Student_INITIAL_STATE);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students');
        const students: IStudent[] = response.data;
        dispatch({ type: 'Student - Load', payload: students });
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const createStudent = async (student: IStudent) => {
    try {
      const response = await api.post(`/students`, student);
      const studentsCreated: IStudent = response.data;
      dispatch({ type: 'Student - Create', payload: studentsCreated });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const editStudent = async (student: IStudent) => {
    const { id, ...studentData } = student;
    try {
      await api.put(`/students/${id}`, studentData);
      dispatch({ type: 'Student - Edit', payload: student });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await api.delete(`/students/${id}`);
      dispatch({ type: 'Student - Delete', payload: id });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        ...state,
        createStudent,
        editStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
