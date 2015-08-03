import { register } from '../ReactTitaniumBridge';

register('image', 'Ti.UI.ImageView', {
  factory: props => Ti.UI.createImageView(props)
});
