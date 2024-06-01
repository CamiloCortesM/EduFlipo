import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { StudentContext, studentReducer } from './';
import { IStudent } from '../../interfaces/entities';
import api from '../../api';

/**
 * Interface defining the shape of the student state.
 */
export interface StudentState {
  isLoaded: boolean;
  students: IStudent[];
}

/**
 * Initial state for the student context.
 */
const Student_INITIAL_STATE: StudentState = {
  isLoaded: false,
  students: [],
};

/**
 * StudentProvider component to provide student state and actions to its children.
 * @param children - Child components to be wrapped by the provider.
 */
export const StudentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, Student_INITIAL_STATE);

   /**
   * Fetch students from the API and update the state.
   */
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

  /**
   * Create a new student and update the state.
   * @param student - Student object to be created.
   */
  const createStudent = async (student: IStudent) => {
    try {
      const response = await api.post(`/students`, student);
      const studentsCreated: IStudent = response.data;
      dispatch({ type: 'Student - Create', payload: studentsCreated });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

    /**
   * Edit an existing student and update the state.
   * @param student - Student object to be edited.
   */
  const editStudent = async (student: IStudent) => {
    const { id, ...studentData } = student;
    try {
      await api.put(`/students/${id}`, studentData);
      dispatch({ type: 'Student - Edit', payload: student });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

    /**
   * Delete a student and update the state.
   * @param id - ID of the student to be deleted.
   */
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
