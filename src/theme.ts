import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    crossroads: {
      primary: React.CSSProperties['color'];
      blue: React.CSSProperties['color'];
      darkBlue: React.CSSProperties['color'];
      green: React.CSSProperties['color'];
      teal: React.CSSProperties['color'];
      yellow: React.CSSProperties['color'];
      red: React.CSSProperties['color'];
      secondary: React.CSSProperties['color'];
      dark: React.CSSProperties['color'];
      light: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    crossroads: {
      primary: React.CSSProperties['color'];
      blue: React.CSSProperties['color'];
      darkBlue: React.CSSProperties['color'];
      green: React.CSSProperties['color'];
      teal: React.CSSProperties['color'];
      yellow: React.CSSProperties['color'];
      red: React.CSSProperties['color'];
      secondary: React.CSSProperties['color'];
      dark: React.CSSProperties['color'];
      light: React.CSSProperties['color'];
    };
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#ffffff',
    },
    primary: {
      main: '#856CC0',
    },
  },
  crossroads: {
    primary: '#856CC0',
    blue: '#1B77F2',
    darkBlue: '#15202B',
    green: '#41B35D',
    teal: '#28B29D',
    yellow: '#ECBC4D',
    secondary: '#f5f5f5',
    red: '#E94F3A',
    dark: '#212121',
    light: '#ffffff',
  },
});

export default theme;
