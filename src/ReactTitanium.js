import invariant from 'invariant';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';
import ReactElement from 'react/lib/ReactElement';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactUpdates from 'react/lib/ReactUpdates';

import inject from './ReactTitaniumInjection';

inject();

export { register as registerElement } from './ReactTitaniumBridge';

export function render(element) {
  invariant(
    ReactElement.isValidElement(element),
    'render(): You must pass a valid ReactElement.'
  );

  const id = ReactInstanceHandles.createReactRootID();
  const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
  const component = instantiateReactComponent(element);

  transaction.perform(() => {
    component.mountComponent(id, transaction, {});
  });

  return component;
}
