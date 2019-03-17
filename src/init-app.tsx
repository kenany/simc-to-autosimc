import { injectGlobal } from 'emotion'
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

let root = document.getElementById('app_root') as Element;
root = render(<App />, document.body, root);
root.setAttribute('id', 'app_root');

if (process.env.NODE_ENV !== 'production') {
  require('preact/debug');

  (module as any).hot.accept('./components/App', () => {
    import('./components/App').then(({ default: App }) => {
      root = render(<App />, document.body, root);
    });
  });
}
