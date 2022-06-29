# solid-keep-alive

Keep you components alive even after parent's unmounts, saving signals and DOM elements in cache to reuse them.

## Installation

### With npm

`npm install solid-keep-alive`

### With yarn

`yarn add solid-keep-alive`

## Usage

Wrap components that you want to keep in cache in `KeepAlive` tags:

```jsx
<KeepAlive id="unique-const-id">
  <Child1 />
  {/* ... */}
</KeepAlive>
```

But first, `KeepAlive` components need a context, so all of them MUST be a descendant of `KeepAliveProvider`. For this you have to wrap your app (preferably) in this provider.

```jsx
import { render } from 'solid-js/web';
import App from './App';
import { KeepAliveProvider } from 'solid-keep-alive';

render(
  () => (
    <KeepAliveProvider>
      <App />
    </KeepAliveProvider>
  ),
  document.getElementById('root')
);
```

You can also put the provider anywhere in the tree, as long as all `KeepAlive` components are descendant of at least one. However you need to be cautious. Having multiple of these context providers in the same app is discouraged because of memory consumption.

Now you can use `KeepAlive` to cache parts of you application.

```jsx
// ...
const [selected, setSelected] = createSignal('first');

return (
  <>
    <Switch>
      <Match when={selected() === 'first'}>
        <KeepAlive id="first-tab">
          {/* everything inside here is kept alive, even after Match unmounts */}
          <FirstView />
          <SomeOtherComponent />
        </KeepAlive>
      </Match>
      <Match when={selected() === 'second'}>
        <KeepAlive id="second-tab">
          {/* this too */}
          <SecondView />
        </KeepAlive>
      </Match>
      <Match when={selected() === 'third'}>
        {/* this is not kept alive, everything here is unmounted immediately */}
        <ThirdView />
      </Match>
    </Tabs>
    {/* ... */}
  </>
);
```

In this example, when a `Match` unmounts, rather than unmounting children immediately, KeepAlive takes ownership of them and saves them in cache, so when `Match` is mounted again children don't need to be remounted, keeping the exact same signals and DOM elements.

Elements from cache are automatically remove when the maximum amount of elements is reached. Default is 10, but you can change this by passing a `maxElements` prop to the context provider:

```jsx
<KeepAliveProvider maxElements={20}>
  <App />
</KeepAliveProvider>
```

To manually dispose elements from cache use the `removeElement` method from the `useKeepAlive` hook:

```jsx
import { useKeepAlive } from 'solid-keep-alive';

const App = () => {
  const [elements, { removeElement }] = useKeepAlive();
  const clickHandler = () => {
    // manually remove cached element where id is 'home-view'
    removeElement('home-view');
  };
  // ...
};
```
