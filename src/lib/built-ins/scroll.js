import { register } from '../ReactTitaniumBridge';

register('scroll', 'Ti.UI.ScrollView', {
  factory: props => Ti.UI.createScrollView(props)
});
