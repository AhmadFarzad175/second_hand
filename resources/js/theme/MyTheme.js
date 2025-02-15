import { createTheme } from '@mui/material/styles';

const MyTheme  = createTheme({
  palette: {
    custom: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffaa11',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    }
  },
  typography: {
    fontFamily: '"Source Code Pro", monospace',
  },
});

export default MyTheme ;   