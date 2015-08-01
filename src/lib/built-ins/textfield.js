import { register } from '../ReactTitaniumBridge';

register("textfield", "Ti.UI.TextField", {
  factory: props => Ti.UI.createTextField(props)
});
