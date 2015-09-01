# Using native modules

**Attention:** there’s still some work left to do to enable native modules to inject themselves automatically inside *react-titanium*. For the time being you’ll need to define them in your app code.

- - -

**Disclaimer:** the APIs used in this guide are subject to change till *react-titanium* reaches `1.0.0`.

- - -

To use a custom module in *react-titanium* you have two different paths:

1. provide a custom, *managed* component;
2. register your module’s views as *built-in* components.

In this guide we’ll see how to register a new component.

If you have any issue following this guide **please** let me know [**by creating an issue**][new-issue] on GitHub.

[new-issue]: https://github.com/yuchi/react-titanium/issues/new

## Registry APIs

```js
import { registerElement } from 'react-titanium';
```

### The `registerElement` function

```js
registerElement : (
    tagname : string,
    apiName : string,
    definition : ElementImpl
  ) -> void
```

Adds a new *definition* in the registry, stored by *tagname* and *apiName*.

- **`tagname : String`** is the one that will be used in JSX expressions and `React.createElement()`.

  If your element ends in `*View` be sure it must be retained in the tag name.

  Examples are `"label"` for `Titanium.UI.Label` and `"list"` for `Titanium.UI.ListView`.

- **`apiName : String`** is the name of the native API, usually composed by the module id and class name.

  Examples are `Titanium.UI.Label` or `de.marcelpociot.CollectionView`.

- **`definition : ElementImpl`** is an object with methods that define how this component reacts to the typical lifecycle events.

### The `ElementImpl` type

```js
type NativeView = any;

type ElementImpl = {
  factory : (props : any) -> NativeView;
  create? : (
      props : any,
      handlers : any,
      getChildren : () -> [NativeView]
    ) -> NativeView;
  update? : (view, props, handlers) -> void;
  updateContext? : (context) -> any;
};
```

- **`factory : (props) -> NativeView`** is a function that given a configuration object **props** it returns a native view (proxy).
  - **`props : any`** the configuration object
  - **must return** a `NativeView`
- **`create? : (props, handlers, getChildren)`** is an optional function that given a configuration object **props**, an object of event listeners **handlers** and a function **getChildren** returns a completely composed view.
  - **`props : any`** the configuration object
  - **`handlers : any`** an object in the form `{ "click": onClick }`
  - **`getChildren : () -> [NativeView]`** a function you can call to get the children of this view as specified by the user.
  - **must return** a rendered `NativeView`
- **`update`** ___TODO___
- **`updateContext`** ___TODO___

## Recipes

The first thing to do is to understand what kind of custom view your module implements:

- **simple views**: views that can be `.add()`ed to parents, with custom methods or events;
- **simple container views**: like the previous ones, but they accept children using the standard Titanium™ APIs (`add`, `remove`, `removeAllChildren`, `insertAt`);
- **top-level views**: they never interfere with other views, such as dialogs or toast notification;
- **top-level container views**: like the previous ones but they accept children with the standard Titanium™ APIs, such as windows;
- **complex views**: they probably can be `.add()`ed but they follow their own particular APIs.

### Simple Views

___TODO:___ Place an example that uses [Ti.SvgView](http://gitt.io/component/com.geraudbourdin.svgview).

### Simple Container Views

___TODO___

### Top-level Views

___TODO___

### Top-level Container Views

___TODO___

### Complex Views

___TODO:___ Place an example of implementation for Marcel Pociot’s CollectionView.
