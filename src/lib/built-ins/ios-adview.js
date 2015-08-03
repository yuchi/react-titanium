import { register } from '../ReactTitaniumBridge';

register('ios-adview', 'Ti.UI.iOS.AdView', {
  factory: props => Ti.UI.iOS.createAdView(props)
});
