import separateChildren from './separateChildren';

const CONTENT_TYPES = {
  string: true, number: true
};

const isTextElement = element => CONTENT_TYPES[ typeof element ];

export default function discernTextChildren(children, isText) {
  return separateChildren(
    children,
    child => isTextElement(child) ? 'texts' : 'nodes'
  );
}
