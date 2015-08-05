
const cache = {};

function isBuiltIn(name) {
  if (!(name in cache)) {
    try {
      require.resolve(`../built-ins/${name}`);
      cache[name] = true;
    }
    catch (ex) {
      cache[name] = false;
    }
  }

  return cache[name];
}

export default function ({ Plugin, types, options }) {
  return new Plugin("babel-plugin-react-titanium", {
    visitor: {
      JSXElement(node, parent, scope, file) {
        const { openingElement: { name: { name } } } = node;

        if (typeof name !== 'string') {
          return;
        }

        if (isBuiltIn(name)) {
          file.addImport(`react-titanium/lib/built-ins/${name}`);
        }
      }
    }
  })
}
