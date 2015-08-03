import { register } from '../ReactTitaniumBridge';

register('ios-coverflow', 'Ti.UI.iOS.CoverFlowView', {
  factory: props => Ti.UI.iOS.createCoverFlowView(props)
});
