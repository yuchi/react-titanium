import { register } from '../ReactTitaniumBridge';

register('android-searchview', 'Ti.UI.Android.SearchView', {
  factory: props => Ti.UI.Android.createSearchView(props)
});
