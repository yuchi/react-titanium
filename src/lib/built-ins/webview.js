import { register } from '../ReactTitaniumBridge';

register('webview', 'Ti.UI.WebView', {
  factory: props => Ti.UI.createWebView(props)
});
