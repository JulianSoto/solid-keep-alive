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

return (
  <Tabs>
    <Tab label="First">
      <KeepAlive id="first-tab">
        {/* everything inside here is kept alive, even after Tab's unmount */}
        <FirstView />
        <SomeOtherComponent />
      </KeepAlive>
    </Tab>
    <Tab label="Second">
      <KeepAlive id="second-tab>
        {/* this too */}
        <SecondView />
      </KeepAlive>
    </Tab>
    <Tab label="Third">
      {/* this is not kept alive, everything here is unmounted immediately */}
      <SecondView />
    </Tab>
  </Tabs>
)

// ...
```

In this example, when a `Tab` unmounts, rather than unmounting children immediately, KeepAlive takes ownership of them and saves them in cache, so when this specific `Tab` is mounted again children don't need to be remounted, keeping the exact same signals and DOM elements.
