import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { TeacherContext, teacherReducer } from '.';
import { ITeacher } from '../../interfaces/entities';
import api from '../../api';

export interface TeacherState {
  isLoaded: boolean;
  teachers: ITeacher[];
}

const Teacher_INITIAL_STATE: TeacherState = {
  isLoaded: false,
  teachers: [],
};

export const TeacherProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(teacherReducer, Teacher_INITIAL_STATE);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/teachers');
        const teachers: ITeacher[] = response.data;
        dispatch({ type: 'Teacher - Load', payload: teachers });
      } catch (error) {
        console.error('Error fetching Teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const createTeacher = async (teacher: ITeacher) => {
    try {
      const response = await api.post(`/teachers`, teacher);
      const teacherCreated: ITeacher = response.data;
      dispatch({ type: 'Teacher - Create', payload: teacherCreated });
    } catch (error) {
      console.error('Error fetching Teachers:', error);
    }
  };

  const editTeacher = async (teacher: ITeacher) => {
    const { id, ...teacherData } = teacher;
    try {
      await api.put(`/teachers/${id}`, teacherData);
      dispatch({ type: 'Teacher - Edit', payload: teacher });
    } catch (error) {
      console.error('Error fetching Teachers:', error);
    }
  };

  const deleteTeacher = async (id: number) => {
    try {
      await api.delete(`/teachers/${id}`);
      dispatch({ type: 'Teacher - Delete', payload: id });
    } catch (error) {
      console.error('Error fetching Teachers:', error);
    }
  };

  return (
    <TeacherContext.Provider
      value={{
        ...state,

        createTeacher,
        editTeacher,
        deleteTeacher,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
