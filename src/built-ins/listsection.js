import { register } from '../ReactTitaniumBridge';

register('listsection', 'Ti.UI.ListSection', {
  factory: props => Ti.UI.createListSection(props),

  create(props, handlers, getChildren) {
    return this.factory(props);
  }
});
