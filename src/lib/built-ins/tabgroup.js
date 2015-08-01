import invariant from 'react/lib/invariant';
import { register, attachListeners } from '../ReactTitaniumBridge';

register("tabgroup", "Ti.UI.TabGroup", {
  factory: props => Ti.UI.createTabGroup(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.Tab'),
      "Only <tab>s can be children of a <tabgroup>"
    );

    const view = this.factory({
      ...props,
      tabs: children
    });

    attachListeners(view, handlers);

    return view;
  }
});
