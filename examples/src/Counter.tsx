import { createSignal, onCleanup } from 'solid-js';

const Counter = () => {
  const [count, setCount] = createSignal(0);

  onCleanup(() => {
    console.log('Counter unmounted');
  });

  return (
    <div>
      <span>Count: {count()}</span>
      <button onclick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
