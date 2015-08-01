import { register } from '../ReactTitaniumBridge';

register("view", "Ti.UI.View", {
  factory: props => Ti.UI.createView(props)
});
