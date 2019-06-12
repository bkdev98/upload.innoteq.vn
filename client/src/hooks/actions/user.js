import HTTPStatus from 'http-status';

import { query, METHODS, ENDPOINTS } from '../../utils/api';

export const INITIAL_STATE = {
  isAuth: false,
  userInfo: null,
  beingLogin: false,
  beingRegister: false,
  beingUpdate: false,
};

export default set => ({
  login: async (data, callback) => {
    set(state => ({ ...state, beingLogin: true }));
    try {
      const result = await query({ method: METHODS.POST, endpoint: ENDPOINTS.login, data });
      if (result.status === HTTPStatus.OK) {
        set(state => ({
          ...state,
          isAuth: true,
          userInfo: result.data,
          beingLogin: false,
        }));
        callback.success();
      } else {
        throw new Error('Có lỗi xảy ra!');
      }
    } catch (error) {
      set(state => ({ ...state, beingLogin: false }));
      callback.failure(error.message);
    }
  },
  register: async (data, callback) => {
    set(state => ({ ...state, beingRegister: true }));
    try {
      const result = await query({ method: METHODS.POST, endpoint: ENDPOINTS.register, data });
      if (result.status === HTTPStatus.CREATED) {
        set(state => ({
          ...state,
          isAuth: true,
          userInfo: result.data,
          beingRegister: false,
        }));
        callback.success();
      } else {
        throw new Error('Có lỗi xảy ra!');
      }
    } catch (error) {
      set(state => ({ ...state, beingRegister: false }));
      callback.failure(error.message);
    }
  },
  updateInfo: async (userId, data, callback) => {
    set(state => ({ ...state, beingUpdate: true }));
    try {
      const result = await query({ method: METHODS.PATCH, endpoint: ENDPOINTS.updateUserInfo + userId, data });
      if (result.status === HTTPStatus.OK) {
        set(state => ({
          ...state,
          userInfo: { ...state.userInfo, ...result.data },
          beingUpdate: false,
        }));
        callback.success();
      } else {
        throw new Error('Có lỗi xảy ra!');
      }
    } catch (error) {
      set(state => ({ ...state, beingUpdate: false }));
      callback.failure(error.message);
    }
  },
  logout: () => set(() => INITIAL_STATE),
});