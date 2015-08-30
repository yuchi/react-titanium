import * as ReactTitaniumIDOperations from './ReactTitaniumIDOperations';

export default class ReactTitaniumTextComponent {
  constructor(props) {}

  construct(text) {
    this._currentElement = text;
    this._rootNodeID = null;
    this._titaniumView = null;
  }

  mountComponent(rootID, transaction, context) {
    this._rootNodeID = rootID;
    this._titaniumView = null;

    const parent = ReactTitaniumIDOperations.retrieve(this._rootNodeID);

    console.log('create', { parent: this._rootNodeID, text: this._currentElement });

    return this;
  }

  receiveComponent(nextText, transaction) {
    const text = this._currentElement;

    if (text !== nextText) {
      // TODO do something
    }
  }

  unmountComponent() {
    // TODO do something
  }

  getPublicInstance() {
    return null;
  }
}
