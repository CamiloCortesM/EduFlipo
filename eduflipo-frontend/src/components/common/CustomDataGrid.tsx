import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Grid } from '@mui/material';

interface CustomDataGridProps {
  rows: any[];
  columns: GridColDef[];
}

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
