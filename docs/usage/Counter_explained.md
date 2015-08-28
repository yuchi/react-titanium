# Counter, explained

This example is a little bit deeper. As we did [before](Hello_World_explained.md), let’s break the code apart.

#### 1. imports

```js
import React, { Component } from 'react';
import { render } from 'react-titanium';
```

Nothing new, but this time we not only import `React` itself, but also bind `React.Component` to the simpler `Component`.

#### 2. defining the root component

```js
class App extends Component {
  // ...
}
```

Here we define `App` as a `React.Component` using the new ES2015 `class` syntax.

#### 3. the initial state

```js
getInitialState() {
  return { count: 0 };
}
```

This is an ES2015 *method*. It is *similar* to writing

```js
App.prototype.getInitialState = function () {
  return { count: 0 };
};
```

but clearer :)

In this case we are implementing one of the React Component Specs, the one that says what is the *state* of our component when it is created.

#### 5. changing the state

```js
incrementCounter(event) {
  this.setState({
    count: this.state.count + 1
  });
}
```

This `incrementCounter` is a custom method that **updates the state** of the component. When called `this.state.count` will in fact increment.

Without this method our app would be pretty boring, isn’t it?

#### 4. dynamic rendering

```js
render() {
  return (
    <window>
      <button>
        You clicked {this.state.count} time(s)
      </button>
    </window>
  );
}
```

We need our `App` to actually have some views, and we return them here.

As you probably noticed the content of the `<button>` now uses also the `{ expr }` syntax. This is the JSX interpolation and it simply places the result of the expression evaluation as a part of the content.

This is not ‘magic’, it’s simply transformed at compile-time into:

````js
"You clicked " + this.state.count + " time(s)"
```

**The `render()` method will be called every time the state changes and React will update the UI accordingly. This is where all of this shines.**

> Note: this is actually an over-semplification, but for now it works.

#### 6. event listeners

```js
(<button onClick={ this.incrementCounter.bind(this) } />)
```

Another new thing in our `<button>` is the use of the `onClick` attribute.

The syntax for attributes is:
- `<view attr="value" />` for static values;
- `<view prop />` for static properties (such as `enabled`);
- `<view attr={ expr } />` for computed values.

We are using the last one to say that the value for `onClick` is `this.incrementCounter`.

We also append `.bind(this)` because we need to access the component. If this is not clear to you then you should read [this guide](https://bonsaiden.github.io/JavaScript-Garden/#function.this).

#### 7. `refs` and `componentDidMount`

```js
(<window ref="window" />)
```

```js
componentDidMount() {
  this.refs.window.open();
}
```

Super tricky for non-React developers!

In the previous example we called [`component.getPublicInstance()`](Hello_World_explained.md#4-opening-the-window) to get a *reference* to an actual `Titanium.UI.Window`. This time we need to wait for the component to be mounted to do it, and in fact we implement the `componentDidMount()` method from the React Component Lifecycle spec.

But how do we get the window? First we need to set the `ref` attribute to `"window"` while rendering, and then we can get it with `this.ref.window`.

> Note: We could have choose a different name, such as `"root"`, in that case we would need to write `this.refs.root`.

#### 8. rendering the app

```js
render(<App />);
```

Not too much to say here. You just instantiate and render an `App` component.
