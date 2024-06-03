import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

interface FormModalProps<T, U extends T> {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: T | U) => void;
  initialData: T;
  title: string;
  fields: { name: keyof T; label: string; type: string }[];
  validate: (data: T) => Record<keyof T, string>;
}

export function FormModal<T, U extends T>({
  open,
  handleClose,
  handleSave,
  initialData,
  title,
  fields,
  validate,
}: FormModalProps<T, U>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formErrors = validate(formData);
    if (Object.values(formErrors).every((error) => error === '')) {
      handleSave(formData);
      setFormData(initialData);
      setErrors({} as Record<keyof T, string>);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field, index) => (
          <TextField
            key={index}
            margin="dense"
            name={field.name as string}
            label={field.label}
            type={field.type}
            fullWidth
            value={formData[field.name]}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
          />
        ))}
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
}
