import { register } from '../ReactTitaniumBridge';

register('switch', 'Ti.UI.Switch', {
  factory: props => Ti.UI.createSwitch(props)
});
