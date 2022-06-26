import { ParentProps } from 'solid-js';
import { KeepAliveProvider } from './Provider';

export default (props: ParentProps) => {
  return <>{props.children}</>;
};

export { KeepAliveProvider };
