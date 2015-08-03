import { register } from '../ReactTitaniumBridge';

register('tableviewsection', 'Ti.UI.TableViewSection', {
  factory: props => Ti.UI.createTableViewSection(props)
});
