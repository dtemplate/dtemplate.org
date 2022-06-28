import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      backgroundPrimary: string;
      backgroundSecondary500: string;
      backgroundSecondary800: string;
      blue500: string;
      blue800: string;
      white: string;
      red: string;
      silver: string;
    };
    fontFamily: string;
  }
}
