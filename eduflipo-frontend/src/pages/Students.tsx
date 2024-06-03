import { useContext,FC } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { StudentContext } from '../context/Students';
import { IStudent } from '../interfaces/entities';
import {
  StudentData,
  StudentModal,
} from '../components/specific/students/StudentModal';
import CustomDataGrid from '../components/common/CustomDataGrid';
import { useCrudModal } from '../hooks/useCrudModal';
import { createColumns } from '../utils/createColumns';
import { SqueletonPage } from '../components/common/SqueletonPage';
import { ButtonCreate } from '../components/ui/ButtonCreate';

export const Students: FC = () => {
  const { isLoaded, students, deleteStudent, createStudent, editStudent } =
    useContext(StudentContext);
  const {
    openModal,
    modalTitle,
    modalData,
    handleOpenModal,
    handleCloseModal,
  } = useCrudModal<StudentData>();

  const handleSave = (data: IStudent) => {
    if (data.id) {
      editStudent(data);
      handleCloseModal();
    } else {
      createStudent(data);
      handleCloseModal();
    }
  };

  const handleDelete = (id: number) => deleteStudent(id);

  // Define grid columns with edit and delete functionality
  const columns: GridColDef[] = createColumns({
    onEdit: (data) => handleOpenModal('Edit Student', data),
    onDelete: handleDelete,
  });

  if (!isLoaded) return <SqueletonPage title="Students" />;

  const rows = students.map((student) => ({
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
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
          Students
        </Typography>
      </header>
      <ButtonCreate handleOpenModal={handleCloseModal} title="Create Student" />
      <CustomDataGrid columns={columns} rows={rows} />
      <StudentModal
        open={openModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        initialData={modalData || undefined}
        title={modalTitle}
      />
    </div>
  );
};
