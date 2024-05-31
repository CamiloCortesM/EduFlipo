// src/pages/Teachers.tsx
import React, { useContext } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Typography, Grid, Skeleton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { TeacherContext } from '../context/Teachers';
import { ITeacher } from '../interfaces/entities';
import { TeacherData, TeacherModal } from '../components/specific/teachers/TeacherModal';
import CustomDataGrid from '../components/common/CustomDataGrid';
import { useCrudModal } from '../hooks/useCrudModal';
import { createColumns } from '../utils/createColumns';

export const Teachers: React.FC = () => {
  const { isLoaded, teachers, deleteTeacher, createTeacher, editTeacher } = useContext(TeacherContext);
  const { openModal, modalTitle, modalData, handleOpenModal, handleCloseModal } = useCrudModal<TeacherData>();

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

  const columns: GridColDef[] = createColumns({
    onEdit: (data) => handleOpenModal('Edit Teacher', data),
    onDelete: handleDelete,
  });

  if (!isLoaded)
    return (
      <div>
        <header>
          <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '1rem', textAlign: 'center' }}>
            Teachers
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

  const rows = teachers.map((teacher) => ({
    id: teacher.id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
  }));

  return (
    <div>
      <header>
        <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '1rem', textAlign: 'center' }}>
          Teachers
        </Typography>
      </header>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color="secondary" variant="contained" onClick={() => handleOpenModal('Create Teacher', null)}>
          Create Teacher
        </Button>
      </Box>
      <CustomDataGrid columns={columns} rows={rows} />
      <TeacherModal open={openModal} handleClose={handleCloseModal} handleSave={handleSave} initialData={modalData || undefined} title={modalTitle} />
    </div>
  );
};
