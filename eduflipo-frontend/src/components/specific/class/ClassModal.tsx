import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { IClass } from '../../../interfaces/entities';
import { validateMinLength } from '../../../utils/validations';

export interface ClassData extends IClass {}

interface ClassModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: ClassData) => void;
  initialData?: ClassData;
  title: string;
}

export const ClassModal: React.FC<ClassModalProps> = ({
  open,
  handleClose,
  handleSave,
  initialData = { className: '', description: '' },
  title,
}) => {
  const [formData, setFormData] = useState<ClassData>(initialData);

  const [errors, setErrors] = useState({
    className: '',
    description: '',
  });

  useEffect(() => {
    const classNameError = validateMinLength(formData.className)
      ? ''
      : 'Class name should contain at least 3 letters';
    const descriptionError = validateMinLength(formData.description)
      ? ''
      : 'Description should contain at least 3 letters';

    setErrors({
      className: classNameError,
      description: descriptionError,
    });
  }, [formData]);
  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    handleSave(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="className"
          label="Class Name"
          type="text"
          fullWidth
          value={formData.className}
          onChange={handleChange}
          error={!!errors.className}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
        />
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
