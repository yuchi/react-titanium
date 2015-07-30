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

const defaults = {
  factory: props => Ti.UI.createView(props),

  create(props, handlers, getChildren) {
    const view = this.factory(props);

    attachListeners(view, handlers);

    updateChildren(view, getChildren());

    return view;
  },

  update(view, props, handlers) {
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
};

export function register(shortName, apiName, config = {}) {
  const definition = {
    ...defaults,
    shortName,
    apiName,
    ...config
  };

  registry[ shortName ] = definition;
  registry[ apiName ] = definition;

  return definition;
}

export function create(type, props, handlers, getChildren) {
  return get(type).create(props, handlers, getChildren);
}

export function update(type, view, props, handlers) {
  return get(type).update(view, props, handlers);
}

export function attachListeners(view, handlers) {
  for (let name in handlers) {
    view.addEventListener(name, handlers[ name ]);
  }
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

register("ios-navigationwindow", "Ti.UI.iOS.NavigationWindow", {
  factory: props => Ti.UI.iOS.createNavigationWindow(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.Window'),
      "Only <window>s can be children of a <ios-navigationwindow>"
    );

    const view = this.factory({
      ...props,
      window: children[0]
    });

    attachListeners(view, handlers);

    return view;
  }
});

register("tabgroup", "Ti.UI.TabGroup", {
  factory: props => Ti.UI.createTabGroup(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.Tab'),
      "Only <tab>s can be children of a <tabgroup>"
    );

    const view = this.factory({
      ...props,
      tabs: children
    });

    attachListeners(view, handlers);

    return view;
  }
});

register("tab", "Ti.UI.Tab", {
  factory: props => Ti.UI.createTab(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    invariant(
      children.every(child => child.apiName === 'Ti.UI.Window'),
      "Only <window>s can be children of a <tab>"
    );

    const view = this.factory({
      ...props,
      window: children[0]
    });

    attachListeners(view, handlers);

    return view;
  }
});

register("window", "Ti.UI.Window", {
  factory: props => Ti.UI.createWindow(props)
});

register("view", "Ti.UI.View", {
  factory: props => Ti.UI.createView(props)
});

register("button", "Ti.UI.Button", {
  factory: props => Ti.UI.createButton(props)
});

register("input", "Ti.UI.TextField", {
  factory: props => Ti.UI.createTextField(props)
});

register("textarea", "Ti.UI.TextArea", {
  factory: props => Ti.UI.createTextArea(props)
});

register("label", "Ti.UI.Label", {
  factory: props => Ti.UI.createLabel(props)
});

register("list", "Ti.UI.ListView", {
  factory: props => Ti.UI.createListView(props)
});

register("switch", "Ti.UI.Switch", {
  factory: props => Ti.UI.createSwitch(props)
});

register("optiondialog", "Ti.UI.OptionDialog", {
  factory: props => Ti.UI.OptionDialog(props)
});

register("slider", "Ti.UI.Slider", {
  factory: props => 	Ti.UI.Slider(props)
});
