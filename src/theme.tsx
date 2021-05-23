import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// creates a mui theme, to be used throughout the app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#001861',
        },
        secondary: {
            main: '#e33c02',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
