import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { TeacherContext } from '../context/Teachers';
import { ITeacher } from '../interfaces/entities';
import {
  TeacherData,
  TeacherModal,
} from '../components/specific/teachers/TeacherModal';
import CustomDataGrid from '../components/common/CustomDataGrid';
import { useCrudModal } from '../hooks/useCrudModal';
import { createColumns } from '../utils/createColumns';
import { SqueletonPage } from '../components/common/SqueletonPage';
import { ButtonCreate } from '../components/ui/ButtonCreate';

export const Teachers: React.FC = () => {
  const { isLoaded, teachers, deleteTeacher, createTeacher, editTeacher } =
    useContext(TeacherContext);
    
  // Use useCrudModal hook to manage the modal state for CRUD operations
  const {
    openModal,
    modalTitle,
    modalData,
    handleOpenModal,
    handleCloseModal,
  } = useCrudModal<TeacherData>();

  const handleSave = (data: ITeacher) => {
    if (data.id) {
      editTeacher(data);
      handleCloseModal();
    } else {
      createTeacher(data);
      handleCloseModal();
    }
  };

  const handleDelete = (id: number) => deleteTeacher(id);

  // Create grid columns with edit and delete functionality
  const columns: GridColDef[] = createColumns({
    onEdit: (data) => handleOpenModal('Edit Teacher', data),
    onDelete: handleDelete,
  });

  if (!isLoaded) return <SqueletonPage title="Teachers" />;

  const rows = teachers.map((teacher) => ({
    id: teacher.id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
  }));

  return (
    <div>
      <header>
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginTop: '1rem',
            textAlign: 'center',
          }}
        >
          Teachers
        </Typography>
      </header>
      <ButtonCreate handleOpenModal={handleOpenModal} title="Create Teacher" />
      <CustomDataGrid columns={columns} rows={rows} />
      <TeacherModal
        open={openModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        initialData={modalData || undefined}
        title={modalTitle}
      />
    </div>
  );
};
