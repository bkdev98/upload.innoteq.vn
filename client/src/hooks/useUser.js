import create from 'zustand';

import actions, { INITIAL_STATE } from './actions/user';
import persist, { getInitialState } from './middlewares/persist';
import logger from './middlewares/logger';

const [useUser, api] = create(
  logger(persist(
    'user',
    set => ({
      ...getInitialState('user', INITIAL_STATE),
      actions: actions(set),
    }),
  )),
);

export { api };

export default useUser;