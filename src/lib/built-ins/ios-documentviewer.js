import { register } from '../ReactTitaniumBridge';

register('ios-documentviewer', 'Ti.UI.iOS.DocumentViewer', {
  factory: props => Ti.UI.iOS.createDocumentViewer(props)
});
