import { register } from '../ReactTitaniumBridge';

register('buttonbar', 'Ti.UI.ButtonBar', {
  factory: props => Ti.UI.createButtonBar(props)
});
