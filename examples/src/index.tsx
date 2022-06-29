/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { KeepAliveProvider } from '../../src';

render(
  () => (
    <KeepAliveProvider maxElements={2}>
      <App />
    </KeepAliveProvider>
  ),
  document.getElementById('root') as HTMLElement
);
