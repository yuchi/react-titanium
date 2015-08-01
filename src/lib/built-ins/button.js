import { register } from '../ReactTitaniumBridge';

register("button", "Ti.UI.Button", {
  factory: props => Ti.UI.createButton(props)
});
