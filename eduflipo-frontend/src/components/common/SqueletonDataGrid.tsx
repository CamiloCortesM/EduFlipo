import { Box, Skeleton, Grid } from '@mui/material';

export const SqueletonDataGrid = () => {
  return (
    <>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Skeleton
          sx={{ bgcolor: 'grey.300' }}
          variant="rounded"
          width={160}
          height={38}
        />
      </Box>
      <Grid container className="fadeIn">
        <Grid
          item
          xs={12}
          sx={{ height: 400, width: '100%', backgroundColor: 'white' }}
        >
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width="100%"
            height={400}
          />
        </Grid>
      </Grid>
    </>
  );
};
