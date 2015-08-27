
export default function groupBy(array, fn) {
  return array.reduce((memo, item, index) => {
    const group = fn(item, index);

    if (group in memo) memo[group].push(item);
    else memo[group] = [item];

    return memo;
  }, {});
}
