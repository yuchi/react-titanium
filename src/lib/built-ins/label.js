import { register } from '../ReactTitaniumBridge';

register("label", "Ti.UI.Label", {
  factory: props => Ti.UI.createLabel(props)
});
