# Counter, compared

This example is way more interesting than the previous one.

## Comparison with the DOM React renderer

> Note: If you never used React you can skip this section.

The biggest difference is in how we treat `ref`s. They are actual views, not components wrapping them. **This change has been introduced in React `v0.14` and is discussed in [a blog post](http://facebook.github.io/react/blog/2015/07/03/react-v0.14-beta-1.html#dom-node-refs)**.

Let’s be honest. For React-speakers this is a very boring example!

## Comparison with Titanium™ Classic

> Note: if you‘re not a Titanium™ developer you can skip this part.

Let‘s have a look at the Classic code:

```js
var count = 0;

var window = Ti.UI.createWindow();
var button = Ti.UI.createButton({
  title: "You clicked 0 time(s)"
});

button.addEventListener('click', function () {
  count++;
  button.title = "You clicked " + count + " time(s)";
});

window.add(button);
window.open();
```

As you can see I had to duplicate the the text of the `<button>` to update it in the event listener.

It’s still ‘pretty’ enough anyway.

## Comparison with Titanium™ Alloy MVC

> Note: if you‘re not a Titanium™ developer you can skip this part.

And now let’s see how it would be on Alloy:

```xml
<!-- index.xml -->
<Alloy>
  <Window>
    <Button onClick="incrementCounter" id="button"></Button>
  </Window>
</Alloy>
```

```js
// index.js
var count = 0;

function incrementCounter() {
  count++;
  updateTitle();
}

function updateTitle() {
  $.button.title = "You clicked " + count + " time(s)";
}

updateTitle();

$.index.open();
```

The main difference between React and Alloy here is in the **meaning** of the **view**:

- in Alloy Views we represent the *initial UI elements*;
- in React Components we represent *present and future UI elements*.

Therefore in Alloy we had to place UI code (the text of the button) inside the controller. To reduce duplicate code we get **dirty controllers** and **anemic views**.

Another small but important difference is in how you define event listeners:

- in Alloy we use scoped functions, which is a great solution;
- in React we need to pass listeners, which is slightly more powerful (and error prone).
