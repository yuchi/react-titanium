import { register } from '../ReactTitaniumBridge';

register('ios-tabbedbar', 'Ti.UI.iOS.TabbedBar', {
  factory: props => Ti.UI.iOS.createTabbedBar(props)
});