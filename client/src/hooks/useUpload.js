import create from 'zustand';

import actions, { INITIAL_STATE } from './actions/upload';
import logger from './middlewares/logger';

const [useUpload] = create(
  logger(set => ({
    ...INITIAL_STATE,
    actions: actions(set),
  })),
);

export default useUpload;
