import { get } from '../ReactTitaniumBridge';
import discernTextChildren from './discernTextChildren';

export default function mutatePropsForTextChildren(type, props, texts) {
  if (!texts) {
    return props;
  }

  const key = get(type).textProperty;

  if (!key) {
    return props;
  }

  props[key] = texts.join('');

  return props;
}
