import { register } from '../ReactTitaniumBridge';

register('listview', 'Ti.UI.ListView', {
  factory: props => Ti.UI.createListView(props)
});
