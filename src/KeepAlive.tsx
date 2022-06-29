import {
  createMemo,
  createRoot,
  getOwner,
  onCleanup,
  ParentProps,
  runWithOwner,
} from 'solid-js';
import { useKeepAlive } from './Provider';

interface KeepAliveProps {
  id: string;
  onDispose?: () => void;
}

const KeepAlive = (props: ParentProps<KeepAliveProps>) => {
  const [keepAliveElements, { insertElement, prioritizeElement }] =
    useKeepAlive();

  const currentElement = createMemo(() =>
    keepAliveElements().find((el) => el.id === props.id)
  );

  if (!currentElement()) {
    createRoot((dispose) => {
      insertElement({
        id: props.id,
        owner: getOwner(),
        children: props.children,
        dispose,
      });
      onCleanup(() => props.onDispose?.());
    });
  }

  return () => {
    let element = currentElement();
    if (element) prioritizeElement(element.id);
    return (
      element?.owner && runWithOwner(element.owner, () => element?.children)
    );
  };
};

export default KeepAlive;
