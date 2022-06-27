import type { Component } from 'solid-js';
import { KeepAlive } from '../../src';

const App: Component = () => {
  return (
    <div>
      <h1>solid-keep-alive examples</h1>
      <KeepAlive>Inside of {'<KeepAlive />'}</KeepAlive>
    </div>
  );
};

export default App;
