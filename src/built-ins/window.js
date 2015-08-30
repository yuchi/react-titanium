import { register } from '../ReactTitaniumBridge';

register("window", "Ti.UI.Window", {
  factory: props => Ti.UI.createWindow(props)
});
