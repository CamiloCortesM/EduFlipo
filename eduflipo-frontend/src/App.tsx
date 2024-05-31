import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { ClassProvider } from './context/Classes';
import { StudentProvider } from './context/Students';
import { TeacherProvider } from './context/Teachers';
import theme from './themes';
import { router } from './routes';

const App = (): JSX.Element => {
  return (
    <TeacherProvider>
      <StudentProvider>
        <ClassProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </ClassProvider>
      </StudentProvider>
    </TeacherProvider>
  );
};

export default App;
