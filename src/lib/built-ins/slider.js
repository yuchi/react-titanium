import { register } from '../ReactTitaniumBridge';

register("slider", "Ti.UI.Slider", {
  factory: props => 	Ti.UI.Slider(props)
});
