/* Functionality to handle the request based on method */
import request from './axiosRequest';

module.exports = {
  del: (path) => request.del(path),
  get: (path, options) => request.get(path, options),
  patch: (path, data, options) => request.patch(path, data, options),
  post: (path, data, options) => request.post(path, data, options),
  put: (path, data, options) => request.put(path, data, options),
};
