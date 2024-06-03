import { useContext, FC } from 'react';
import { Visibility } from '@mui/icons-material';
import { Typography, IconButton, Chip } from '@mui/material';
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
import { SqueletonPage } from '../components/common/SqueletonPage';
import { ButtonCreate } from '../components/ui/ButtonCreate';
import { useCrudModal } from '../hooks/useCrudModal';
import { useAssignTeacher } from '../hooks/useAssignTeacher';
import { useAddStudents } from '../hooks/useAddStudents';
import { useStudentsModal } from '../hooks/useStudentsModal';

export const Classes: FC = () => {
  const { isLoaded, classes, deleteClass, createClass, updateClass } =
    useContext(ClassContext);

  const {
    handleCloseAssignTeacherModal,
    handleOpenAssignTeacherModal,
    handleSaveAssignTeacherModal,
    openAssignTeacherModal,
    selectedClassId,
  } = useAssignTeacher();

  const {
    handleCloseModal,
    handleOpenModal,
    modalData,
    modalTitle,
    openModal,
  } = useCrudModal<ClassData>();

  const {
    handleCloseAddStudentsModal,
    handleOpenAddStudentsModal,
    handleSaveStudents,
    openAddStudentsModal,
  } = useAddStudents();

  const {
    handleCloseStudentsModal,
    handleOpenStudentsModal,
    className,
    open: openStudentsModal,
  } = useStudentsModal();

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

  if (!isLoaded) return <SqueletonPage title="Classes" />;

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
      <ButtonCreate handleOpenModal={handleOpenModal} title="Create class" />
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
