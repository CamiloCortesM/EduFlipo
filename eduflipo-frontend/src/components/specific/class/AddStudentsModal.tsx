import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Chip,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { StudentContext } from '../../../context/Students';
import { SelectInput } from '../../ui/SelectInput';

interface AddStudentsModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (studentIds: number[]) => void;
}

export const AddStudentsModal: React.FC<AddStudentsModalProps> = ({
  open,
  handleClose,
  handleSave,
}) => {
  const { students } = useContext(StudentContext);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | ''>('');

  useEffect(() => {
    if (!open) {
      setSelectedStudents([]);
      setSelectedStudent('');
    }
  }, [open]);

  const handleAddStudent = () => {
    if (selectedStudent && !selectedStudents.includes(selectedStudent)) {
      setSelectedStudents([...selectedStudents, selectedStudent]);
      setSelectedStudent('');
    }
  };

  const handleRemoveStudent = (studentId: number) => {
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedStudent(event.target.value as number);
  };

  const handleSubmit = () => {
    handleSave(selectedStudents);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Students</DialogTitle>
      <DialogContent
        sx={{
          width: { md: 600, xs: 300 },
        }}
      >
        <SelectInput
          selectedEntity={selectedStudent}
          handleChange={handleChange}
          entities={students}
          text="student"
          title="Select Student"
        />
        <Button
          onClick={handleAddStudent}
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add Student
        </Button>
        <Box sx={{ mt: 2 }}>
          {selectedStudents.map((studentId) => (
            <Chip
              key={studentId}
              label={
                students.find((student) => student.id === studentId)
                  ?.firstName +
                ' ' +
                students.find((student) => student.id === studentId)?.lastName
              }
              onDelete={() => handleRemoveStudent(studentId)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
