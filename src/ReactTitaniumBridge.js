import invariant from 'invariant';
import OS_IOS from 'titanium-platforms/os/ios';

const { assign } = Object;

// Utilities

export discernTextChildren from './utils/discernTextChildren';
export extractHandlers from './utils/extractHandlers';
export mutatePropsForTextChildren from './utils/mutatePropsForTextChildren';
export separateChildren from './utils/separateChildren';

// Definitions

const registry = {};

export function get(type) {
  invariant(
    (type in registry),
    `No definition found for "${ type }"`
  );

  return registry[ type ];
}

export function getApiName(type) {
  if (type in registry) return registry[ type ].apiName;
  else return type;
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
