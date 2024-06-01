import React, { useContext } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Typography, Grid, Skeleton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { StudentContext } from '../context/Students';
import { IStudent } from '../interfaces/entities';
import { StudentData, StudentModal } from '../components/specific/students/StudentModal';
import CustomDataGrid from '../components/common/CustomDataGrid';
import { useCrudModal } from '../hooks/useCrudModal';
import { createColumns } from '../utils/createColumns';

export const Students: React.FC = () => {
  const { isLoaded, students, deleteStudent, createStudent, editStudent } = useContext(StudentContext);
  const { openModal, modalTitle, modalData, handleOpenModal, handleCloseModal } = useCrudModal<StudentData>();

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

  if (!isLoaded)
    return (
      <div>
        <header>
          <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '1rem', textAlign: 'center' }}>
            Students
          </Typography>
        </header>
        <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
          <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rounded" width={160} height={38} />
        </Box>
        <Grid container className="fadeIn">
          <Grid item xs={12} sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" width="100%" height={400} />
          </Grid>
        </Grid>
      </div>
    );

  const rows = students.map((student) => ({
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
  }));

  return (
    <div>
      <header>
        <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '1rem', textAlign: 'center' }}>
          Students
        </Typography>
      </header>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color="secondary" variant="contained" onClick={() => handleOpenModal('Create Student', null)}>
          Create Student
        </Button>
      </Box>
      <CustomDataGrid columns={columns} rows={rows} />
      <StudentModal open={openModal} handleClose={handleCloseModal} handleSave={handleSave} initialData={modalData || undefined} title={modalTitle} />
    </div>
  );
};
