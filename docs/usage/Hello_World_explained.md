# Hello World, explained

Let’s break that down this [initial example](Hello_World.md) and understand what we’re doing.

#### 1. libraries

```js
import React from 'react';
import { render } from 'react-titanium';
```

Of course we need to pull our dependencies in the app, and we do it by using the new `import/from` syntax from ES2015.

That `import { x } from 'x'` line means that I don‘t want all the module, but just the `render` function it exports.

#### 2. elements

```js
import 'react-titanium/lib/built-ins/window';
import 'react-titanium/lib/built-ins/label';
```

This is a little tricky. Because Titanium™ SDK searches for actually used APIs when building the final app to reduce the size the distribution, we need to explicitly tell him which APIs we want. If *react-titanium* did configured all of them then this optimization would be broken.

I know it looks silly to do, in fact in a few minutes we’ll see how to make the compilation do it for us.

#### 3. rendering

```js
const component = render(
  <window>
    <button>Hello World</button>
  </window>
);
```

This very difficult to read if you’re not accustomed to React, but it’s actually very easy.

First of all `const` is like `var` but we are sure that `component` will never be assigned a new value.

Then we’re assigning the result of calling `render()` (the one exported by *react-titanium*) with a *JSX Expression* as the first argument.

If that syntax is not your piece of cake, you can read it as follows:

```js
const component = render(
  React.createElement('window', null,
    React.createElement('label', null,
      'Hello World'))
);
```

We’ll use JSX through the guide.

#### 4. opening the window

```js
component.getPublicInstance().open();
```

**Attention:** this is not how you work with React! It’s ok only because we need a short example!

If we skip this line our app would be stuck at the splash screen, the red one with a big white `a` for Appcelerator.

But the `component` that we got from `render()` is not a `Titanium.UI.Window` and it doesn’t have any method to actually open the window.

What we need is the underlying view, and we can get it with `.getPublicInstance()`.

This in turn is an actual `Titanium.UI.Window`, and of course has all the methods we expect and need.

## What’s next

If you’re curious about how it compares to other frameworks, head to the [comparison page](Hello_World_compared.md).
