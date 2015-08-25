import OS_ANDROID from 'titanium-platforms/os/android';
import OS_IOS from 'titanium-platforms/os/ios';
import ReactMultiChildUpdateTypes from 'react/lib/ReactMultiChildUpdateTypes';

import * as ReactTitaniumBridge from './ReactTitaniumBridge';

const { INSERT_MARKUP, MOVE_EXISTING, SET_MARKUP, TEXT_CONTENT, REMOVE_NODE } =
  ReactMultiChildUpdateTypes;

export const actions = {
  [INSERT_MARKUP](update, components) {
    const component = components[update.markupIndex];
    const view = component.getPublicInstance();
    const parent = update.parentNode;

    if (OS_IOS) {
      parent.add({ view, position: update.toIndex });
    }
    else if (OS_ANDROID) {
      parent.insertAt({ view, position: update.toIndex });
    }
    else {
      const children = parent.children.slice(0);

      const nextChildren = []
        .concat(children.slice(0, update.toIndex))
        .concat(view)
        .concat(children.slice(update.toIndex));

      ReactTitaniumBridge.updateChildren(parent, nextChildren);
    }
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

export function replaceNode(prevNode, component) {
  // FIXME Need to understand when does this happen
  const nextNode = component.getPublicInstance();
  const parentNode = prevNode.parent;

  if (parentNode) {
    parentNode.remove(prevNode);
    parentNode.add(nextNode);
  }
}
