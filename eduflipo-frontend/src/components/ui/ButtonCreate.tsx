import { AddOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  handleOpenModal: (title: string, data: null) => void;
  title:string
};

export const ButtonCreate: FC<Props> = ({ handleOpenModal,title }) => {
  return (
    <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
      <Button
        startIcon={<AddOutlined />}
        color="secondary"
        variant="contained"
        onClick={() => handleOpenModal('Create Teacher', null)}
      >
        {title}
      </Button>
    </Box>
  );
};
