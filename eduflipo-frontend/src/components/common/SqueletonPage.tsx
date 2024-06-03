import { Typography } from '@mui/material';
import { SqueletonDataGrid } from './SqueletonDataGrid';
import { FC } from 'react';

type Props = {
  title: string;
};

export const SqueletonPage: FC<Props> = ({ title }) => {
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
          {title}
        </Typography>
      </header>
      <SqueletonDataGrid />
    </div>
  );
};
