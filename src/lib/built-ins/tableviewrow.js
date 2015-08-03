import { register } from '../ReactTitaniumBridge';

register('tableviewrow', 'Ti.UI.TableViewRow', {
  factory: props => Ti.UI.createTableViewRow(props)
});
