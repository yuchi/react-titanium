import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';
import ReactInjection from 'react/lib/ReactInjection';

import ReactTitaniumComponent from './ReactTitaniumComponent';
import ReactTitaniumReconcileTransaction from './ReactTitaniumReconcileTransaction';
import * as ReactTitaniumIDOperations from './ReactTitaniumIDOperations';
//import ReactTitaniumTextComponent from './text';

export default function inject() {
  ReactInjection.NativeComponent.injectGenericComponentClass(
    ReactTitaniumComponent
  );

  //ReactInjection.NativeComponent.injectTextComponentClass(
  //  ReactiTextComponent
  //);

  ReactInjection.Updates.injectReconcileTransaction(
    ReactTitaniumReconcileTransaction
  );

  // NOTE: very dirty trick due to react@0.14-beta1's current state
  // NOTE: should be `ReactInjection.Component.injectEnvironment({ ... })`
  ReactComponentEnvironment.processChildrenUpdates =
    ReactTitaniumIDOperations.dangerouslyProcessChildrenUpdates;
}
