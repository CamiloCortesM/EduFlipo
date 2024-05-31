// src/utils/createColumns.tsx
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPerson } from '../interfaces/entities';

interface ColumnConfig {
  onEdit: (data: IPerson) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({ onEdit, onDelete }: ColumnConfig): GridColDef[] => [
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 300,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }: GridRenderCellParams) => (
      <>
        <IconButton
          color="primary"
          size="small"
          sx={{ marginRight: '0.5rem' }}
          onClick={() => onEdit(row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          sx={{ marginRight: '0.5rem' }}
          onClick={() => onDelete(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];
