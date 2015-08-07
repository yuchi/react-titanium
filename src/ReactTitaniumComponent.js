import ReactMultiChild from 'react/lib/ReactMultiChild';

import * as ReactTitaniumBridge from './ReactTitaniumBridge';
import * as ReactTitaniumIDOperations from './ReactTitaniumIDOperations';

const { assign } = Object;

export default class ReactTitaniumComponent {

  constructor(type) {
    this._type = type.toLowerCase();
    this._renderedChildren = null;
    this._previousStyle = null;
    this._previousStyleCopy = null;
    this._rootNodeID = null;
    this._wrapperState = null;
    this._topLevelWrapper = null;
    this._nodeWithLegacyProperties = null;
  }

  construct(element) {
    this._currentElement = element;
    this._titaniumView = null;
  }

  mountComponent(rootID, transaction, context) {
    this._rootNodeID = rootID;

    const { type, props: { children, ...options } } = this._currentElement;

    const { handlers, rest } = ReactTitaniumBridge.extractHandlers(options);

    const getChildren = () => {
      return this
        .mountChildren(children, transaction, context)
        .map(component => component._titaniumView)
    };

    const view = ReactTitaniumBridge.create(type, rest, handlers, getChildren);

    this._titaniumView = view;

    ReactTitaniumIDOperations.store(this._rootNodeID, this._titaniumView);

    return this;
  }

  receiveComponent(nextElement, transaction, context) {
    const { type, props: {children, ...options } } = nextElement;

    const { handlers, rest } = ReactTitaniumBridge.extractHandlers(options);

    const view = this._titaniumView;

    ReactTitaniumBridge.update(type, view, rest, handlers);

    const childrenToUse = [].concat(children || []).filter(Boolean);

    this.updateChildren(childrenToUse, transaction, context);

    return this;
  }

  unmountComponent() {
    const view = this._titaniumView;
    const parent = view.parent;

    if (parent) {
      parent.remove(view);
    }

    ReactTitaniumIDOperations.drop(this._rootNodeID);

    this._titaniumView = null;
    this.unmountChildren();
  }

  getPublicInstance() {
    return this._titaniumView;
  }

}

assign(
  ReactTitaniumComponent.prototype,
  ReactMultiChild.Mixin
);
