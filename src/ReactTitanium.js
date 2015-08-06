import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactElement from 'react/lib/ReactElement';
import ReactUpdates from 'react/lib/ReactUpdates';
import invariant from 'react/lib/invariant';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';

import inject from './ReactTitaniumInjection';

inject();

export { register as registerElement } from './ReactTitaniumBrdidge';

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
