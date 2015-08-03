import { register } from '../ReactTitaniumBridge';

register('activityindicator', 'Ti.UI.ActivityIndicator', {
  factory: props => Ti.UI.createActivityIndicator(props)
});
