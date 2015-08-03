import invariant from 'react/lib/invariant';
import { register, attachListeners } from '../ReactTitaniumBridge';

register("ipad-popover", "Ti.UI.iPad.Popover", {
  factory: props => Ti.UI.iPad.createPopover(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.length === 1,
      `<ipad-popover> requires exactly 1 children (got ${ children.length })`
    );

    const view = this.factory({
      ...props,
      contentView: children[0]
    });

    attachListeners(view, handlers);

    return view;
  }
});
