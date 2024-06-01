import { IClass, IStudent } from '../../interfaces/entities';
import { ClassState } from './';

/**
 * Action types for the Class reducer.
 */
type ClassActionType =
  | { type: 'Class - Load'; payload: IClass[] }
  | { type: 'Class - Create'; payload: IClass }
  | { type: 'Class - Update'; payload: IClass }
  | { type: 'Class - Delete'; payload: number }
  | {
      type: 'Class - Assign Teacher';
      payload: { id: number; teacher: { id: number; name: string } };
    }
  | {
      type: 'Class - Assign Students';
      payload: { id: number; students: string[] };
    }
  | { type: 'Class - view Students'; payload: IStudent[] };

export const classReducer = (
  state: ClassState,
  action: ClassActionType
): ClassState => {
  switch (action.type) {
    case 'Class - Load':
      return {
        ...state,
        isLoaded: true,
        classes: action.payload,
      };

    case 'Class - Create':
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };

    case 'Class - Update':
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls.id === action.payload.id
            ? {
                ...action.payload,
                teacher: cls.teacher,
                students: cls.students,
              }
            : cls
        ),
      };

    case 'Class - Delete':
      return {
        ...state,
        classes: state.classes.filter((cls) => cls.id !== action.payload),
      };

    case 'Class - Assign Teacher':
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls.id === action.payload.id
            ? {
                ...cls,
                teacher: action.payload.teacher,
              }
            : cls
        ),
      };

    case 'Class - Assign Students':
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls.id === action.payload.id
            ? { ...cls, students: action.payload.students }
            : cls
        ),
      };
    case 'Class - view Students':
      return {
        ...state,
        studentsInClass: action.payload,
      };

    default:
      return state;
  }
};
