import { register } from '../ReactTitaniumBridge';

register('imageview', 'Ti.UI.ImageView', {
  factory: props => Ti.UI.createImageView(props)
});
