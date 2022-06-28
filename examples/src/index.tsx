/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { KeepAliveProvider } from '../../src';

render(
  () => (
    <KeepAliveProvider>
      <App />
    </KeepAliveProvider>
  ),
  document.getElementById('root') as HTMLElement
);
