import ReactChildren from 'react/lib/ReactChildren';

export default function separateChildren(children, fn) {
  const results = {};

  ReactChildren.map(children, child => {
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
}
