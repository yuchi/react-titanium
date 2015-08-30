import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';
import ReactInjection from 'react/lib/ReactInjection';

import ReactTitaniumComponent from './ReactTitaniumComponent';
//import ReactTitaniumTextComponent from './ReactTitaniumTextComponent';
import ReactTitaniumReconcileTransaction from './ReactTitaniumReconcileTransaction';
import * as ReactTitaniumIDOperations from './ReactTitaniumIDOperations';

export default function inject() {
  ReactInjection.NativeComponent.injectGenericComponentClass(
    ReactTitaniumComponent
  );

  //ReactInjection.NativeComponent.injectTextComponentClass(
  //  ReactTitaniumTextComponent
  //);

  ReactInjection.Updates.injectReconcileTransaction(
    ReactTitaniumReconcileTransaction
  );

  // NOTE: very dirty trick due to react@0.14-beta3's current state
  // NOTE: should be `ReactInjection.Component.injectEnvironment({ ... })`
  ReactComponentEnvironment.processChildrenUpdates =
    ReactTitaniumIDOperations.dangerouslyProcessChildrenUpdates;
  ReactComponentEnvironment.replaceNodeWithMarkupByID =
    ReactTitaniumIDOperations.dangerouslyReplaceNodeWithMarkupByID;
}
