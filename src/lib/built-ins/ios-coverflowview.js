import { register } from '../ReactTitaniumBridge';

register('ios-coverflowview', 'Ti.UI.iOS.CoverFlowView', {
  factory: props => Ti.UI.iOS.createCoverFlowView(props)
});
