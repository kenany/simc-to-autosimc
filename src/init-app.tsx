import { injectGlobal } from '@emotion/css';
import { h, render } from 'preact';

import App from './components/App';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    background-color: #141617;
    color: #98a3ad;
    font-family: "Open Sans", sans-serif;
    margin: 0 auto;
    max-width: 750px;
    padding: 0 2em;
  }
`

const root = document.getElementById('app') as HTMLElement;

async function main() {
  if (process.env.NODE_ENV !== 'production') await import('preact/debug');
  render(<App />, root);
}

main();
