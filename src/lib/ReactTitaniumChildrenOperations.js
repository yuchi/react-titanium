import ReactMultiChildUpdateTypes from 'react/lib/ReactMultiChildUpdateTypes';

import * as ReactTitaniumBridge from './ReactTitaniumBridge';

const { INSERT_MARKUP, MOVE_EXISTING, SET_MARKUP, TEXT_CONTENT, REMOVE_NODE } =
  ReactMultiChildUpdateTypes;

export const actions = {
  [INSERT_MARKUP](update, components) {
    const component = components[update.markupIndex];
    const view = component.getPublicInstance();
    const parent = update.parentNode;

    const children = parent.children.slice(0);

    const nextChildren = []
      .concat(children.slice(0, update.toIndex))
      .concat(view)
      .concat(children.slice(update.toIndex));

    ReactTitaniumBridge.updateChildren(parent, nextChildren);
  },

  [REMOVE_NODE](update, components) {
    // nothing to do here
  }
};

export function processChildrenUpdates(updates, components) {
  const length = updates.length;

  let i = 0;

  for (; i < length; ++i) {
    let update = updates[i];

    actions[update.type](update, components);
  }
}
