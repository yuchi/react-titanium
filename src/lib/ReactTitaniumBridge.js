
import invariant from 'react/lib/invariant';

const { assign } = Object;

// Utilities

const handlerRE = /^on[A-Z]/g;

export function extractHandlers(props) {
  const handlers = {};
  const rest = {};

  for (let key of Object.keys(props)) {
    if (key.match(handlerRE)) {
      handlers[ key.slice(2, 3).toLowerCase() + key.slice(3) ] = props [ key ];
    }
    else {
      rest[ key ] = props[ key ];
    }
  }

  return { handlers, rest };
}

// Definitions

const registry = {};

export function get(type) {
  invariant(
    (type in registry),
    `No definition found for "${ type }"`
  );

  return registry[ type ];
}

export function register(shortName, apiName, config = {}) {
  const definition = { shortName, apiName, ...config };

  registry[ shortName ] = definition;
  registry[ apiName ] = definition;

  return definition;
}

export function create(type, props, handlers) {
  const definition = get(type);

  const view = definition.factory(props);

  for (let name in handlers) {
    view.addEventListener(name, handlers[ name ]);
  }

  return view;
}

export function update(view, props, handlers) {
  // TODO: manage handlers

  for (let key in props) {
    let nextValue = props[key];

    if (key === 'value') {
      let oldValue = view[key];

      if (nextValue === oldValue) {
        continue;
      }
    }

    view[key] = nextValue;
  }

  // view.applyProperties(props);
}

export function updateChildren(view, children) {
  view.removeAllChildren();

  // NOTE: Sloooooooow...

  let i = 0;
  let l = children.length;

  for (; i < l; ++i) {
    if (children[i]) {
      view.add(children[i]);
    }
  }
}

// Built-ins

register("window", "Titanium.UI.Window", {
  factory: props => Titanium.UI.createWindow(props)
});

register("view", "Titanium.UI.View", {
  factory: props => Titanium.UI.createView(props)
});

register("button", "Titanium.UI.Button", {
  factory: props => Titanium.UI.createButton(props)
});

register("input", "Titanium.UI.TextField", {
  factory: props => Titanium.UI.createTextField(props)
});

register("textarea", "Titanium.UI.TextArea", {
  factory: props => Titanium.UI.createTextArea(props)
});

register("label", "Titanium.UI.Label", {
  factory: props => Titanium.UI.createLabel(props)
});

register("list", "Titanium.UI.ListView", {
  factory: props => Titanium.UI.createListView(props)
});

register("root", "react.titanium.Root", {
  factory: props => ({
    apiName: "react.titanium.Root",

    children: [],

    add(child) {
      this.children.push(child);
    },

    open(props) {
      for (let child of this.children) {
        child.open(props);
      }
    }
  })
});
