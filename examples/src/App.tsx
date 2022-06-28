import { Component, createSignal, Show } from 'solid-js';
import { KeepAlive } from '../../src';
import { useKeepAlive } from '../../src/Provider';
import Counter from './Counter';

const App: Component = () => {
  const [, { removeElement }] = useKeepAlive();
  const [show, setShow] = createSignal(true);

  return (
    <div>
      <h1>solid-keep-alive examples</h1>
      <button onclick={() => removeElement('keep-alive--counter')}>
        Unmount counter
      </button>
      <button onclick={() => setShow(false)} disabled={!show()}>
        Hide counter
      </button>
      <button onclick={() => setShow(true)} disabled={show()}>
        Show counter
      </button>
      <Show when={show()}>
        <KeepAlive id="keep-alive--counter">
          <Counter />
        </KeepAlive>
      </Show>
    </div>
  );
};

export default App;
