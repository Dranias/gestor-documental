import { createTheme } from '@mui/material/styles';

export const customTheme = (outerTheme) =>
  createTheme({
    palette: {
        primary: {
          main: '#f2f0e9',
          nofocus: '#cfcbc2',
          dark: '#9c937c',
        },
      },
  });