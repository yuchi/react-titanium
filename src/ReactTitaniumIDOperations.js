import {
  processChildrenUpdates,
  replaceNode
} from './ReactTitaniumChildrenOperations';

const cache = new Map();

export function store(id, view) {
  cache.set(id, view);
}

export function retrieve(id) {
  return cache.get(id);
}

export function drop(id) {
  cache.delete(id);
}

export function dangerouslyProcessChildrenUpdates(updates, components) {
  for (let i = 0, l = updates.length; i < l; ++i) {
    updates[i].parentNode = retrieve(updates[i].parentID);
  }

  processChildrenUpdates(updates, components);
}

export function dangerouslyReplaceNodeWithMarkupByID(id, markup) {
  const node = retrieve(id);

  replaceNode(node, markup);
}
