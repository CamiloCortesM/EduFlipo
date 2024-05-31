export interface IPerson {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IStudent extends IPerson {}
export interface ITeacher extends IPerson {}

export interface IAssignTeacher {
  teacherId: number;
}

export interface IAssignStudents {
  studentsIds: number[];
}

export interface IClass {
  id?: number;
  className: string;
  description: string;
  teacher?: {
    id: number;
    name: string;
  } | null;
  students?: string[] | [];
}
