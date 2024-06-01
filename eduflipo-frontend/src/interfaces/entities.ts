// Interface for a person
export interface IPerson {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Interface for a student, extending IPerson
export interface IStudent extends IPerson {}

// Interface for a teacher, extending IPerson
export interface ITeacher extends IPerson {}

// Interface for assigning a teacher to a class
export interface IAssignTeacher {
  teacherId: number;
}

// Interface for assigning students to a class
export interface IAssignStudents {
  studentIds: number[];
}

// Interface for a class
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
