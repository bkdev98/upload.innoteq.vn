import axios from 'axios';

import { api } from '../hooks/useUser';

const API_URL = 'http://localhost:9843/api/v1';

export const query = async ({
  method = METHODS.GET,
  endpoint = '/',
  data = {},
  headers = {},
  params = {},
}) =>
  await axios({
    method,
    url: API_URL + endpoint,
    data,
    params,
    headers: api.getState().isAuth
      ? { ...headers, token: api.getState().userInfo.token }
      : headers,
  });

export const METHODS = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const ENDPOINTS = {
  login: '/user/login',
  register: '/user/register',
  updateUserInfo: '/user/',
  uploadFile: '/upload',
  getUploadFile: '/upload',
  deleteUploadFile: '/upload/',
};