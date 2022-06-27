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
    insertElement: (element: KeepAliveElement) => void;
    removeElement: (id: string) => void;
  }
];

const KeepAliveContext = createContext<Store>([
  () => [],
  {
    insertElement: () => void 0,
    removeElement: () => void 0,
  },
]);

const KeepAliveProvider = (props: ParentProps) => {
  const [keepAliveElements, setKeepAliveElements] = createSignal<
    KeepAliveElement[]
  >([]);

  const insertElement = (element: KeepAliveElement) => {
    setKeepAliveElements((prev) => [...prev, element]);
  };

  const removeElement = (id: string) => {
    setKeepAliveElements((prev) => prev.filter((el) => el.id !== id));
  };

  const store: Store = [keepAliveElements, { insertElement, removeElement }];

  return (
    <KeepAliveContext.Provider value={store}>
      {props.children}
    </KeepAliveContext.Provider>
  );
};

const useKeepAlive = () => {
  return useContext(KeepAliveContext);
};

export { KeepAliveProvider };
export { useKeepAlive };
