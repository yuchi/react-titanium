import invariant from 'react/lib/invariant';
import { register, attachListeners } from '../ReactTitaniumBridge';

register("ios-navigationwindow", "Ti.UI.iOS.NavigationWindow", {
  factory: props => Ti.UI.iOS.createNavigationWindow(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.Window'),
      "Only <window>s can be children of a <ios-navigationwindow>"
    );

    const view = this.factory({
      ...props,
      window: children[0]
    });

    attachListeners(view, handlers);

    return view;
  }
});
