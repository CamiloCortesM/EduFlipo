import { StudentState } from '.';
import { IStudent } from '../../interfaces/entities';

type StudentActionType =
  | { type: 'Student - Load', payload: IStudent[] }
  | { type: 'Student - Create', payload: IStudent }
  | { type: 'Student - Edit', payload: IStudent }
  | { type: 'Student - Delete', payload: number };

export const studentReducer = (
  state: StudentState,
  action: StudentActionType
): StudentState => {
  switch (action.type) {
    case 'Student - Load':
      return {
        ...state,
        isLoaded: true,
        students: action.payload,
      };
    case 'Student - Create':
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case 'Student - Edit':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    case 'Student - Delete':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload),
      };
    default:
      return state;
  }
};
