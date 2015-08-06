import invariant from 'invariant';

import { register, attachListeners } from '../ReactTitaniumBridge';

register("tabgroup", "Ti.UI.TabGroup", {
  factory: props => Ti.UI.createPickerColumn(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.PickerRow'),
      "Only <pickerrow>s can be children of a <pickercolumn>"
    );

    const view = this.factory(props);

    let i = 0;
    const l = children.length;

    for (; i < l; ++i) {
      view.addRow(children[i]);
    }

    attachListeners(view, handlers);

    return view;
  }
});
