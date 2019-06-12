export const PERSIST_KEY = 'upload-innoteq';

export const getInitialState = (key, INITIAL_STATE) => {
  const state = JSON.parse(localStorage.getItem(PERSIST_KEY));
  if (state && state[key]) {
    return state[key];
  }
  return INITIAL_STATE;
}

const persist = (key, value) => {
  const curr = JSON.parse(localStorage.getItem(PERSIST_KEY));
  const next = JSON.stringify({ ...curr, [key]: value });
  localStorage.setItem(PERSIST_KEY, next);
};

export default (key, fn) => (set, get) => fn(args => {
  set(args)
  persist(key, get());
}, get);