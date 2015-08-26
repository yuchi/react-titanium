import invariant from 'invariant';
import OS_IOS from 'titanium-platforms/os/ios';
import ReactChildren from 'react/lib/ReactChildren';

const { assign } = Object;

// Utilities

const handlerRE = /^on[A-Z]/g;

export function extractHandlers(props) {
  const handlers = {};
  const rest = {};

  for (let key of Object.keys(props)) {
    const value = props[ key ];

    if ((typeof value === 'function') && key.match(handlerRE)) {
      handlers[ key.slice(2, 3).toLowerCase() + key.slice(3) ] = value;
    }
    else {
      rest[ key ] = value;
    }
  }

  return { handlers, rest };
}

const separateChildren = (obj, fn) => {
  const results = {};

  ReactChildren.map(obj, child => {
    const group = fn(child);

    if (group != null) {
      if (group in results) {
        results[group].push(child);
      }
      else {
        results[group] = [child];
      }
    }
  });

  return results;
};

const CONTENT_TYPES = {
  string: true, number: true
};

const isTextElement = element => CONTENT_TYPES[ typeof element ];

export function discernTextChildren(children, isText) {
  return separateChildren(
    children,
    child => isTextElement(child) ? 'texts' : 'nodes'
  );
}

export function mutatePropsForText(type, props, texts) {
  if (!texts) {
    return props;
  }

  const key = get(type).textProperty;

  if (!key) {
    return props;
  }

  props[key] = texts.join('');

  return props;
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
  if (OS_IOS) {
    view.add(children);
  }
  else {
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
}
