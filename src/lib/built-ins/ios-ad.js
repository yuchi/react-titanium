import { register } from '../ReactTitaniumBridge';

register('ios-ad', 'Ti.UI.iOS.AdView', {
  factory: props => Ti.UI.iOS.createAdView(props)
});
