import { ParentProps } from 'solid-js';

const KeepAlive = (props: ParentProps) => {
  return <>{props.children}</>;
};

export default KeepAlive;
