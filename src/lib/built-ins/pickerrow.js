import { register } from '../ReactTitaniumBridge';

register('pickerrow', 'Ti.UI.PickerRow', {
  factory: props => Ti.UI.createPickerRow(props)
});
