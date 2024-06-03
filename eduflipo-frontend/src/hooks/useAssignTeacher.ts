// useAssignTeacher.ts
import { useContext, useState } from 'react';
import { ClassContext } from '../context/Classes';

interface UseAssignTeacher {
  openAssignTeacherModal: boolean;
  selectedClassId: number | null;
  handleOpenAssignTeacherModal: (teacherId: number, classId: number) => void;
  handleCloseAssignTeacherModal: () => void;
  handleSaveAssignTeacherModal: (teacherId: number | '') => void;
}

export const useAssignTeacher = (): UseAssignTeacher => {
  const { assignTeacher } = useContext(ClassContext);
  
  const [openAssignTeacherModal, setOpenAssignTeacherModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [classIdActive, setClassIdActive] = useState<number | null>(null);

  const handleOpenAssignTeacherModal = (teacherId: number, classId: number) => {
    setClassIdActive(classId);
    setSelectedClassId(teacherId);
    setOpenAssignTeacherModal(true);
  };

  const handleCloseAssignTeacherModal = () => {
    setOpenAssignTeacherModal(false);
    setClassIdActive(null);
  };

  const handleSaveAssignTeacherModal = (teacherId: number | '') => {
    if (!classIdActive || !teacherId) return;
    assignTeacher(classIdActive, teacherId);
    setClassIdActive(null);
    handleCloseAssignTeacherModal();
  };

  return {
    openAssignTeacherModal,
    handleOpenAssignTeacherModal,
    handleCloseAssignTeacherModal,
    handleSaveAssignTeacherModal,
    selectedClassId,
  };
};
