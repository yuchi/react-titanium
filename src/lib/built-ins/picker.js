import { register } from '../ReactTitaniumBridge';

register('picker', 'Ti.UI.Picker', {
  factory: props => Ti.UI.createPicker(props)
});
