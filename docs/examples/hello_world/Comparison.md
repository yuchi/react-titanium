# Hello World, compared

Let’s see how this small example compares to the standard DOM renderer for React, to Titanium™ Classic and Titanium™ Alloy.

## Comparison with the DOM React renderer

> Note: If you never used React you can skip this section.

You probably noticed something different from how you normally use React, and that difference is that **we didn’t specified the *container element***.

This is to be expected since we don’t have nothing comparable to a `document` or even a `window` to append our views to.

Furthermore the view we are rendering is `Titanium.UI.Window`, a *top-level view*, one that you inherently cannot append to anything.

Another difference is **the complete absence of interspersed text and element nodes**,  but we’ll get to it.

## Comparison with Titanium™ Classic

> Note: if you‘re not a Titanium™ developer you can skip this part.

that same code written in Classic (that means *without Alloy*) could be the following:

```js
var window = Titanium.UI.createWindow();
var button = Titanium.UI.createButton({ title: 'Hello World' });

window.add(button);
window.open();
```

For this contrived example the complexity of writing UIs using imperative and OOP patterns is not very explicit. Nonetheless you can already see that using JSX we have a clear idea of the shape of our views just by **watching the code, without actually reading it**.

This is one of the reasons why Alloy itself has been created. That brings us to the next one…

## Comparison with Titanium™ Alloy MVC

> Note: if you‘re not a Titanium™ developer you can skip this part.

First of all we’re not comparing React+JSX to an MVC framework! That would be silly!

We are comparing it to the `V` in Alloy MVC, which of course stands for `View`.

In Alloy our example would look like this

```xml
<!-- index.xml -->
<Alloy>
  <Window>
    <Button>Hello World</Button>
  </Window>
</Alloy>
```

```js
// index.js
$.index.open();
```

which is strikingly similar!

The huge difference is that in Alloy the XML represents the **initial state of the interface**. We’ll see in the next examples how that is not true for React.

For the moment let’s call it a draw, and move to the [next example](../counter/README.md)!
