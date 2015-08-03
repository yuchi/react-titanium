import { register } from '../ReactTitaniumBridge';

register('scrollview', 'Ti.UI.ScrollView', {
  factory: props => Ti.UI.createScrollView(props)
});
