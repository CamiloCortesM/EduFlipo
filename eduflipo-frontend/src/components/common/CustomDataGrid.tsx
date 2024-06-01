import React from 'react';

import { Grid } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

interface CustomDataGridProps {
  rows: any[];
  columns: GridColDef[];
}

// CustomDataGrid component renders a DataGrid with the provided rows and columns
const CustomDataGrid: React.FC<CustomDataGridProps> = ({ rows, columns }) => {
  return (
    <Grid container className="fadeIn">
      <Grid
        item
        xs={12}
        sx={{ height: 400, width: '100%', backgroundColor: 'white' }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          localeText={{
            toolbarDensity: 'Size',
            toolbarDensityLabel: 'Size',
            toolbarDensityCompact: 'Small',
            toolbarDensityStandard: 'Medium',
            toolbarDensityComfortable: 'Large',
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default CustomDataGrid;
