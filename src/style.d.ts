import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      hover: string;
      border: string;
      background: string;
      logOutBox: string;
      error: string;
      twitter: string;
    };
    border: {
      default: string;
    };
  }
}
