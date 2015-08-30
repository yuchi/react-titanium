
export default function once(
    target, name, { initializer: init, ...rest }) {

  const key = '_' + name + '_has_run';

  return {
    initializer() {
      const fn = this::init();

      return (arg) => {
        if (!arg) return;
        if (this[key]) return;

        this::fn(arg);
        this[key] = true;
      };
    },
    ...rest
  }
}
