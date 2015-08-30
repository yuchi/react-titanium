# Components Reference

## Creating your components

There’s nothing magic in *react-titanium* that makes it different from other React renderers. You can follow the [original documentation][react], but keep in mind that we’re talking about `v0.14`.

[react]: https://facebook.github.io/react

## [Using native modules](Native_modules.md)

With little ceremony you can expose your custom native views in *react-titanium*. [Follow the guide](Native_modules.md) and you’ll be up and running in no time. **Works for both module developers and consumers**.

## Non-standard components

Some components require some care to be used correctly. Read the component’s specific documentation to see how to use them.

* [Top Level Views](/docs/components/Top_Level_Views.md)
* [List Views](/docs/components/List_Views.md)
* [Table Views](/docs/components/Table_Views.md)

## Full list of components

| API Name                     | element                |
|------------------------------|------------------------|
| `Ti.UI.View`                 | `view`                 |
| `Ti.UI.ActivityIndicator`    | `activityindicator`    |
| `Ti.UI.Android.SearchView`   | `android-searchview`   |
| `Ti.UI.Button`               | `button`               |
| `Ti.UI.ButtonBar`            | `buttonbar`            |
| `Ti.UI.ImageView`            | `image`                |
| `Ti.UI.Label`                | `label`                |
| `Ti.UI.ListView`             | `list`                 |
| `Ti.UI.MaskedImage`          | `maskedimage`          |
| `Ti.UI.Picker`               | `picker`               |
| `Ti.UI.PickerColumn`         | `pickercolumn`         |
| `Ti.UI.PickerRow`            | `pickerrow`            |
| `Ti.UI.ProgressBar`          | `progressbar`          |
| `Ti.UI.ScrollView`           | `scroll`               |
| `Ti.UI.SearchBar`            | `searchbar`            |
| `Ti.UI.Slider`               | `slider`               |
| `Ti.UI.Switch`               | `switch`               |
| `Ti.UI.Tab`                  | `tab`                  |
| `Ti.UI.TabGroup`             | `tabgroup`             |
| `Ti.UI.TableViewRow`         | `tableviewrow`         |
| `Ti.UI.TableViewSection`     | `tableviewsection`     |
| `Ti.UI.TextArea`             | `textarea`             |
| `Ti.UI.TextField`            | `textfield`            |
| `Ti.UI.WebView`              | `webview`              |
| `Ti.UI.Window`               | `window`               |
| `Ti.UI.iOS.AdView`           | `ios-ad`               |
| `Ti.UI.iOS.CoverFlowView`    | `ios-coverflow`        |
| `Ti.UI.iOS.DocumentViewer`   | `ios-documentviewer`   |
| `Ti.UI.iOS.NavigationWindow` | `ios-navigationwindow` |
| `Ti.UI.iOS.TabbedBar`        | `ios-tabbedbar`        |
| `Ti.UI.iPad.Popover`         | `ipad-popover`         |

## Unimplemented components

Those are non-simple components that require specific care. Just a matter of time! :)

| API Name                          | element                     |
|-----------------------------------|-----------------------------|
| `Ti.UI.MobileWeb.NavigationGroup` | `mobileweb-navigationgroup` |
| `Ti.UI.ScrollableView`            | `scrollable`                |
| `Ti.UI.TableView`                 | `table`                     |
| `Ti.UI.iOS.SplitWindow`           | `ios-splitwindow`           |
| `Ti.UI.iOS.Toolbar`               | `ios-toolbar`               |

#### Dialogs

Still haven’t decided how to work on those:

- I should do something with the dialog `Ti.UI.AlertDialog`
- I should do something with the dialog `Ti.UI.EmailDialog`
- I should do something with the dialog `Ti.UI.OptionDialog`
