import { register } from '../ReactTitaniumBridge';

register('searchbar', 'Ti.UI.SearchBar', {
  factory: props => Ti.UI.createSearchBar(props)
});
