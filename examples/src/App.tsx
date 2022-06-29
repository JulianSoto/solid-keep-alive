import {
  Component,
  createEffect,
  createSignal,
  JSX,
  Match,
  ParentProps,
  Switch,
} from 'solid-js';
import { KeepAlive } from '../../src';
import { useKeepAlive } from '../../src/Provider';
import Counter from './Counter';

const Button = (
  props: ParentProps<{
    selected?: boolean;
    onclick?: JSX.DOMAttributes<HTMLButtonElement>['onclick'];
  }>
) => {
  return (
    <button
      onclick={props.onclick}
      style={{
        padding: '16px',
        border: 'none',
        'border-bottom': props.selected ? 'solid 3px black' : 'none',
      }}
    >
      {props.children}
    </button>
  );
};

const App: Component = () => {
  const [keepAliveElements, { removeElement }] = useKeepAlive();
  const [selectedTab, setSelectedTab] = createSignal<'one' | 'two' | 'three'>(
    'one'
  );

  createEffect(() => console.log({ keepAliveElements: keepAliveElements() }));

  return (
    <div>
      <h1>solid-keep-alive examples</h1>
      <div>
        <Button
          onclick={() => setSelectedTab('one')}
          selected={selectedTab() === 'one'}
        >
          One
        </Button>
        <Button
          onclick={() => setSelectedTab('two')}
          selected={selectedTab() === 'two'}
        >
          Two
        </Button>
        <Button
          onclick={() => setSelectedTab('three')}
          selected={selectedTab() === 'three'}
        >
          Three
        </Button>
      </div>
      <Switch>
        <Match when={selectedTab() === 'one'}>
          <KeepAlive id="tab-one">
            <h1>Tab one</h1>
            <button onclick={() => removeElement('tab-one')}>
              Unmount tab
            </button>
            <Counter />
          </KeepAlive>
        </Match>
        <Match when={selectedTab() === 'two'}>
          <KeepAlive id="tab-two">
            <h1>Tab two</h1>
            <Counter />
          </KeepAlive>
        </Match>
        <Match when={selectedTab() === 'three'}>
          <KeepAlive id="tab-three">
            <h1>Tab three</h1>
            <Counter />
          </KeepAlive>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
