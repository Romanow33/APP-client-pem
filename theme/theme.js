import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { shape } from 'prop-types';



// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: "white"
    },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },


  typography: {
    titles: {
      fontWeight: 'bold',
      fontFamily: "Lobster",
      fontSize: "5em"
    },
    subtitle: {
      fontFamily: 'Rajdhani',
      fontWeight: 'bold',
      fontSize: "1.2em"
    }
  },

});

export default theme;
