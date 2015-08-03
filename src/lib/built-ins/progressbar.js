import { register } from '../ReactTitaniumBridge';

register('progressbar', 'Ti.UI.ProgressBar', {
  factory: props => Ti.UI.createProgressBar(props)
});
