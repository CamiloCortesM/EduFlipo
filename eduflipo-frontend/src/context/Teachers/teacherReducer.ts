import { TeacherState } from ".";
import { ITeacher } from "../../interfaces/entities";


type TeacherActionType =
| { type: 'Teacher - Load', payload: ITeacher[] }
| { type: 'Teacher - Create', payload: ITeacher }
| { type: 'Teacher - Edit', payload: ITeacher }
| { type: 'Teacher - Delete', payload: number };

export const teacherReducer = (
  state: TeacherState,
  action: TeacherActionType
): TeacherState => {
  switch (action.type) {
    case 'Teacher - Load':
      return {
        ...state,
        isLoaded: true,
        teachers: action.payload,
      };
    case 'Teacher - Create':
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    case 'Teacher - Edit':
      return {
        ...state,
        teachers: state.teachers.map(teacher =>
          teacher.id === action.payload.id ? action.payload : teacher
        ),
      };
    case 'Teacher - Delete':
      return {
        ...state,
        teachers: state.teachers.filter(teacher => teacher.id !== action.payload),
      };
    default:
      return state;
  }
};
