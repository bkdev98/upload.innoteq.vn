
import HTTPStatus from 'http-status';

import { query, METHODS, ENDPOINTS } from '../../utils/api';

export const INITIAL_STATE = {
  list: [],
  total: 0,
  beingFetch: false,
  beingUpload: false,
};

export default set => ({
  getUploadFile: async ({ skip, search }, callback) => {
    set(state => ({ ...state, beingFetch: true }));
    try {
      const result = await query({
        endpoint: ENDPOINTS.getUploadFile,
        params: {
          limit: 8,
          skip: skip * 8 || 0,
          search,
        },
      });
      if (result.status === HTTPStatus.OK) {
        set(state => ({
          ...state,
          list: result.data.uploads,
          total: result.data.total,
          beingFetch: false,
        }));
      } else {
        throw new Error('Có lỗi xảy ra!')
      }
    } catch (error) {
      set(state => ({ ...state, beingFetch: false }));
      callback.failure(error.message);
    }
  },
  uploadFile: async (file, callback) => {
    set(state => ({ ...state, beingUpload: true }));
    try {
      const data = new FormData();
      data.append('file', file);
      const result = await query({
        method: METHODS.POST,
        endpoint: ENDPOINTS.uploadFile,
        headers: { 'content-type': 'multipart/form-data' },
        data,
      });
      if (result.status === HTTPStatus.OK) {
        set(state => ({
          ...state,
          list: [ result.data, ...state.list ],
          listAll: [ result.data, ...state.listAll ],
          total: state.total + 1,
          totalAll: state.totalAll + 1,
        }));
        callback.success();
      } else {
        throw new Error('Có lỗi xảy ra!');
      }
    } catch (error) {
      set(state => ({ ...state, beingUpload: false }));
      callback.failure(error.message);
    }
  },
  deleteFile: async (fileId, callback) => {
    set(state => ({ ...state, beingDelete: true }));
    try {
      const result = await query({
        method: METHODS.DELETE,
        endpoint: ENDPOINTS.deleteUploadFile + fileId,
      });
      if (result.status === 200) {
        set(state => ({
          ...state,
          list: state.list.filter(item => item._id !== result.data._id),
          total: state.total - 1,
        }));
        callback.success();
      } else {
        throw new Error('Có lỗi xảy ra!');
      }
    } catch (error) {
      set(state => ({ ...state, beingDelete: false }));
      callback.failure(error.message);
    }
  },
});