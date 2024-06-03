import { useContext, useState } from 'react';
import { ClassContext } from '../context/Classes';

interface UseAddStudents {
  openAddStudentsModal: boolean;
  classIdActive: number | null;
  handleOpenAddStudentsModal: (classId: number) => void;
  handleCloseAddStudentsModal: () => void;
  handleSaveStudents: (studentIds: number[]) => void;
}

export const useAddStudents = (): UseAddStudents => {
  const { assignStudents } = useContext(ClassContext);
  const [openAddStudentsModal, setOpenAddStudentsModal] = useState(false);
  const [classIdActive, setClassIdActive] = useState<number | null>(null);

  const handleOpenAddStudentsModal = (classId: number) => {
    setClassIdActive(classId);
    setOpenAddStudentsModal(true);
  };

  const handleCloseAddStudentsModal = () => {
    setOpenAddStudentsModal(false);
  };

  const handleSaveStudents = (studentIds: number[]) => {
    if (!classIdActive || !studentIds) return;
    assignStudents(classIdActive, studentIds);
    setClassIdActive(null);
    handleCloseAddStudentsModal();
  };

  return {
    openAddStudentsModal,
    handleOpenAddStudentsModal,
    handleCloseAddStudentsModal,
    handleSaveStudents,
    classIdActive,
  };
};
