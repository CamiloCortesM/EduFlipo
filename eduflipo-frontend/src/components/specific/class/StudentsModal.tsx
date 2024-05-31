import { FC, useContext } from 'react';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ClassContext } from '../../../context/Classes';

interface StudentsModalProps {
  open: boolean;
  onClose: () => void;
  className: string;
}

const StudentsModal: FC<StudentsModalProps> = ({
  open,
  onClose,
  className,
}) => {
  const { studentsInClass } = useContext(ClassContext);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { md: 500, xs: '90%' },
          p: 3,
          maxHeight: 600,
          overflow: 'hidden',
        }}
      >
        <IconButton
          color="error"
          sx={{
            position: 'absolute',
            right: 15,
            top: 15,
          }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          Students of {className}
        </Typography>
        <Box
          sx={{
            overflowY: 'scroll',
            maxHeight: 500,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsInClass.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Modal>
  );
};

export default StudentsModal;
