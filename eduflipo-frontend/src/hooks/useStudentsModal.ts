import { useContext, useState } from 'react';
import { ClassContext } from '../context/Classes';

interface StudentsModalState {
  open: boolean;
  className: string;
}

interface StudentsModalActions {
  handleOpenStudentsModal: (classId: number, name: string) => void;
  handleCloseStudentsModal: () => void;
}

type UseStudentsModal = StudentsModalState & StudentsModalActions;

export const useStudentsModal = (): UseStudentsModal => {
  const { viewAllStudentsOfClass } = useContext(ClassContext);
  const [state, setState] = useState<StudentsModalState>({
    open: false,
    className: '',
  });

  const handleOpenStudentsModal = (classId: number, name: string) => {
    viewAllStudentsOfClass(classId);
    setState({ open: true, className: name });
  };

  const handleCloseStudentsModal = () => {
    setState({ open: false, className: '' });
  };

  return {
    ...state,
    handleOpenStudentsModal,
    handleCloseStudentsModal,
  };
};
