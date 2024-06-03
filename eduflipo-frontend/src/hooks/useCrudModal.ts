import { useState } from 'react';
import { IClass, IPerson } from '../interfaces/entities';

export const useCrudModal = <T extends IPerson | IClass>() => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<T | null>(null);

  const handleOpenModal = (title: string, data: T | null) => {
    setModalTitle(title);
    setModalData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  return {
    openModal,
    modalTitle,
    modalData,
    handleOpenModal,
    handleCloseModal,
  };
};
