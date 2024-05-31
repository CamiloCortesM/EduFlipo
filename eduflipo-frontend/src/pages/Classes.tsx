import React, { useContext, useState } from 'react';
import { AddOutlined, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  Grid,
  Skeleton,
  IconButton,
  Chip,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ClassContext } from '../context/Classes';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { AddStudentsModal } from '../components/specific/class/AddStudentsModal';
import { AssignTeacherModal } from '../components/specific/class/AssignTeacherModal';
import { ClassData, ClassModal } from '../components/specific/class/ClassModal';
import StudentsModal from '../components/specific/class/StudentsModal';
import CustomDataGrid from '../components/common/CustomDataGrid';

export const Classes: React.FC = () => {
  const {
    isLoaded,
    classes,
    deleteClass,
    viewAllStudentsOfClass,
    assignTeacher,
    createClass,
    updateClass,
    assignStudents,
  } = useContext(ClassContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<ClassData | null>(null);

  const [openStudentsModal, setOpenStudentsModal] = useState(false);
  const [openAddStudentsModal, setOpenAddStudentsModal] = useState(false);
  const [className, setClassName] = useState('');

  const [openAssignTeacherModal, setOpenAssignTeacherModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [classIdActive, setClassIdActive] = useState<number | null>(null);

  const handleOpenModal = (title: string, data: ClassData | null) => {
    setModalTitle(title);
    setModalData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  const handleSave = (data: ClassData) => {
    console.log(data);
    if (data.id) {
      updateClass(data);
      handleCloseModal();
      console.log('Edit data:', data);
      return;
    }
    console.log('Saved data:', data);
    createClass(data);
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    deleteClass(id);
  };

  const handleOpenStudentsModal = (classId: number, Name: string) => {
    viewAllStudentsOfClass(classId);
    setClassName(Name);
    setOpenStudentsModal(true);
  };

  const handleCloseStudentsModal = () => {
    setOpenStudentsModal(false);
  };

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
    console.log('Saved students:', studentIds);
    setClassIdActive(null);
    handleCloseAddStudentsModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'className',
      headerName: 'Class Name',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'teacher',
      headerName: 'Teacher',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams) => (
        <>
          {row.teacher ? (
            row.teacher.name
          ) : (
            <Chip
              label="Teacher not assigned"
              color="error"
              variant="outlined"
            />
          )}
        </>
      ),
    },
    {
      field: 'numStudents',
      headerName: 'Number of Students',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams) => (
        <>
          {row.numStudents}
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleOpenStudentsModal(row.id, row.className)}
          >
            <Visibility />
          </IconButton>
        </>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              color="primary"
              size="small"
              sx={{ marginRight: '0.5rem' }}
              onClick={() =>
                handleOpenModal('Edit Class', {
                  id: row.id,
                  className: row.className,
                  description: row.description,
                })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              sx={{ marginRight: '0.5rem' }}
              onClick={() => handleDelete(row.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="default"
              size="small"
              sx={{ marginRight: '0.5rem' }}
              onClick={() =>
                handleOpenAssignTeacherModal(row.teacher?.id ?? null, row.id)
              }
            >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              color="default"
              size="small"
              onClick={() => handleOpenAddStudentsModal(row.id)}
            >
              <GroupAddIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  if (!isLoaded)
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
            Classes
          </Typography>
        </header>
        <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="end">
            <Skeleton
              sx={{ bgcolor: 'grey.300' }}
              variant="rounded"
              width={160}
              height={38}
            />
          </Box>
        </Box>
        <Grid container className="fadeIn">
          <Grid
            item
            xs={12}
            sx={{ height: 400, width: '100%', backgroundColor: 'white' }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ height: 400, width: '100%' }}>
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  width="100%"
                  height={400}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );

  const rows = classes.map((cls) => ({
    id: cls.id,
    className: cls.className,
    description: cls.description,
    teacher: cls.teacher ?? null,
    numStudents: cls.students?.length,
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
          Classes
        </Typography>
      </header>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          variant="contained"
          onClick={() => handleOpenModal('Create Class', null)}
        >
          Create Class
        </Button>
      </Box>
      {/* datagrid */}
      <CustomDataGrid columns={columns} rows={rows} />
      <ClassModal
        open={openModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        initialData={modalData || undefined}
        title={modalTitle}
      />
      <StudentsModal
        open={openStudentsModal}
        onClose={handleCloseStudentsModal}
        className={className}
      />
      <AssignTeacherModal
        open={openAssignTeacherModal}
        handleClose={handleCloseAssignTeacherModal}
        handleSave={handleSaveAssignTeacherModal}
        teacherId={selectedClassId}
      />
      <AddStudentsModal
        open={openAddStudentsModal}
        handleClose={handleCloseAddStudentsModal}
        handleSave={handleSaveStudents}
      />
    </div>
  );
};
