import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { validateName, validateEmail } from '../../../utils/validations';

export interface StudentData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface StudentModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: StudentData) => void;
  initialData?: StudentData;
  title: string;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  open,
  handleClose,
  handleSave,
  initialData = { firstName: '', lastName: '', email: '' },
  title,
}) => {
  const [formData, setFormData] = useState<StudentData>(initialData);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open]);

  useEffect(() => {
    const firstNameError = validateName(formData.firstName)
      ? ''
      : 'First name should contain only letters';
    const lastNameError = validateName(formData.lastName)
      ? ''
      : 'Last name should contain only letters';
    const emailError = validateEmail(formData.email)
      ? ''
      : 'Invalid email format';

    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(errors);
    if (!errors.firstName && !errors.lastName && !errors.email) {
      handleSave(formData);
      setFormData({ firstName: '', lastName: '', email: '' });
    } else {
      console.log(
        'Form is invalid. Please correct the errors before submitting.'
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
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
