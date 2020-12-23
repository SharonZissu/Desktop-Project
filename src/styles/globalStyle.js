import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300&display=swap');
* {
  margin: 0;
  padding: 0;
}
*,
*::after,
*::before {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; //1rem = 10px
  min-height: 100vh;
}

body {
  /* font-family: 'Assistant', sans-serif; */
  line-height: 1.6;
  padding: 4rem;
  height: 100vh;
  overflow: hidden;
  
}

`;
