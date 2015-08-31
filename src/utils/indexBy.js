
export default function indexBy(array, fn, memo = {}) {
  return array && array.reduce((memo, item, index) => {
    memo[fn(item, index)] = item;
    return memo;
  }, memo);
}
