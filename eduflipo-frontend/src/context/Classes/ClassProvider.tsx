import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { ClassContext, classReducer } from './';
import { IClass, IStudent } from '../../interfaces/entities';
import api from '../../api';

export interface ClassState {
  isLoaded: boolean;
  classes: IClass[];
  studentsInClass: IStudent[];
}

const Class_INITIAL_STATE: ClassState = {
  isLoaded: false,
  classes: [],
  studentsInClass: [],
};

export const ClassProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(classReducer, Class_INITIAL_STATE);

  const loadClasses = (classes: IClass[]) => {
    dispatch({ type: 'Class - Load', payload: classes });
  };

  const createClass = async (newClass: IClass) => {
    try {
      const response = await api.post(`/classes`, newClass);
      const classCreated: IClass = response.data;

      console.log(classCreated);
      const newClassCreated = {
        ...classCreated,
        teacher: null,
        students: [],
      };

      dispatch({ type: 'Class - Create', payload: newClassCreated });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const updateClass = async (updatedClass: IClass) => {
    console.log({ updatedClass });
    const { id, ...classData } = updatedClass;
    try {
      await api.put(`/classes/${id}`, classData);
      dispatch({ type: 'Class - Update', payload: updatedClass });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteClass = async (classId: number) => {
    try {
      await api.delete(`/classes/${classId}`);
      dispatch({ type: 'Class - Delete', payload: classId });
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const assignTeacher = async (classId: number, teacherId: number) => {
    try {
      const teacherAssigned = await api.post(
        `/classes/${classId}/assign-teacher`,
        { teacherId }
      );

      const { teacher } = teacherAssigned.data;
      const newTeacherAssigned = {
        id: teacher.id,
        name: teacher.firstName + ' ' + teacher.lastName,
      };

      dispatch({
        type: 'Class - Assign Teacher',
        payload: { id: classId, teacher: newTeacherAssigned },
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const assignStudents = async (id: number, studentIds: number[]) => {
    try {
      const studentsData = await api.post(`/classes/${id}/assign-students`, {
        studentIds,
      });

      const { students } = studentsData.data;

      const newStudents = students.map(
        (student: IStudent) => student.firstName + ' ' + students.lastName
      );

      dispatch({
        type: 'Class - Assign Students',
        payload: { id, students: newStudents },
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const viewAllStudentsOfClass = async (id: number) => {
    try {
      const response = await api.get(`/classes/${id}/students`);
      const students: IStudent[] = response.data;
      dispatch({ type: 'Class - view Students', payload: students });
    } catch (error) {
      console.error('Error fetching get Students for class:', error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/classes');
        const classes: IClass[] = response.data;
        loadClasses(classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <ClassContext.Provider
      value={{
        ...state,

        createClass,
        updateClass,
        deleteClass,
        assignTeacher,
        assignStudents,
        viewAllStudentsOfClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
