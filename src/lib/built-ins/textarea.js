import { register } from '../ReactTitaniumBridge';

register("textarea", "Ti.UI.TextArea", {
  factory: props => Ti.UI.createTextArea(props)
});
