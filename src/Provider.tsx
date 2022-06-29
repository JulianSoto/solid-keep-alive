import {
  createContext,
  createSignal,
  JSX,
  ParentProps,
  useContext,
} from 'solid-js';
import { Accessor, Owner } from 'solid-js/types/reactive/signal';

export interface KeepAliveElement {
  id: string;
  owner: Owner | null;
  children: JSX.Element;
  dispose: () => void;
}

export type Store = [
  Accessor<KeepAliveElement[]>,
  {
    insertElement: (element: KeepAliveElement) => KeepAliveElement | undefined;
    removeElement: (id: string) => void;
  }
];

const KeepAliveContext = createContext<Store>([
  () => [],
  {
    insertElement: () => undefined,
    removeElement: () => void 0,
  },
]);

export const KeepAliveProvider = (
  props: ParentProps<{ maxElements?: number }>
) => {
  const [keepAliveElements, setKeepAliveElements] = createSignal<
    KeepAliveElement[]
  >([]);

  const insertElement = (element: KeepAliveElement) => {
    setKeepAliveElements((prev) => {
      let newArray = [...prev, element];
      if (newArray.length > (props.maxElements || 10)) newArray.shift();
      return newArray;
    });
    return element;
  };

  const removeElement = (id: string) => {
    const element = keepAliveElements().find((el) => el.id === id);
    if (element) {
      element.dispose();
      setKeepAliveElements((prev) => prev.filter((el) => el.id !== element.id));
    }
  };

  const store: Store = [keepAliveElements, { insertElement, removeElement }];

  return (
    <KeepAliveContext.Provider value={store}>
      {props.children}
    </KeepAliveContext.Provider>
  );
};

export const useKeepAlive = () => {
  return useContext(KeepAliveContext);
};
