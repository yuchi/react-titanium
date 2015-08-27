
const handlerRE = /^on[A-Z]/g;

export default function extractHandlers(props) {
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
