import { createTheme } from '@material-ui/core';
export default createTheme({
  palette: {
    backgroundColor: {
      light: '#f5f5f5',
      main: '#ffffff',
      dark: '#575757',
    },
    primary: {
      light: '#fbfbfb',
      main: '#AC1715',
      dark: '#898d93',
    },
    secondary: {
      light: '#f2f2f2',
      main: '#E8E8E8',
      dark: '#f5f5f5',
    },
    text: {
      light: '#9A9A9A',
      main: '#616161',
      dark: '#707070',
      other: '#B69C72',
      white: '#ffffff',
    },
    button: {
      primary: {
        backgroundColor: '#B69C72',
        color: '#ffffff',
      },
      secondary: {
        border: '#d9d9d9',
        color: '#333333',
      },
      ghost: {
        backgroundColor: '#818181',
        color: '#ffffff',
      },
      link: {
        color: '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Roboto',
      fontSize: 16,
    },
  },
  typography: {
    // fontFamily: 'Roboto, sans-serif, "Segoe UI", "Helvetica Neue"',
    fontSize: 16,
    fontWeightRegular: 400,
    h1: {
      fontWeight: 700,
      fontSize: '35px',
      lineHeight: 'inherit',
    },
    h2: {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 'inherit',
      // [breakpoints.down('sm')]: {
      //   fontSize: '18px',
      // },
    },
    h3: {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 'inherit',
    },
    h4: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 'inherit',
    },
    h5: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 'inherit',
    },
    h6: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 'inherit',
    },
    body1: {
      fontSize: 16,
      fontWeightRegular: 400,
    },
    body2: {
      fontSize: 14,
      fontWeightRegular: 400,
    },

    subtitle1: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: 1.17,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'inherit',
      padding: '5px 0px',
      minHeight: 35,
      minWidth: 125,
      border: 'none',
      borderRadius: '5px',
    },
  },
  spacing: factor =>
    [
      0,
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
    ][factor],
});
