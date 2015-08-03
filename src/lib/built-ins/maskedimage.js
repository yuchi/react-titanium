import { register } from '../ReactTitaniumBridge';

register('maskedimage', 'Ti.UI.MaskedImage', {
  factory: props => Ti.UI.createMaskedImage(props)
});
