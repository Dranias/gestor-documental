import { createTheme } from '@mui/material/styles';

export const customTheme = (outerTheme) =>
  createTheme({
    palette: {
        primary: {
          main: '#d6d1C4',
          nofocus: '#cfcbc2',
          dark: '#9c937c',
        },
      },
  });