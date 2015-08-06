import invariant from 'invariant';

import { register, attachListeners } from '../ReactTitaniumBridge';

register("tab", "Ti.UI.Tab", {
  factory: props => Ti.UI.createTab(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.Window'),
      "Only <window>s can be children of a <tab>"
    );

    const view = this.factory({
      ...props,
      window: children[0]
    });

    attachListeners(view, handlers);

    return view;
  }
});
