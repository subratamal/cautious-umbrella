/*Functionality to handle the request based on method */
import request from './axiosRequest';

module.exports = {

  del: function(path) {
    return (
      request
      .del(path)
    );
  },

  get: function(path, options) {
    return (
      request
      .get(path, options)
    );
  },

  patch: function(path, data, options) {
    return (
      request
      .patch(path, data, options)
    );
  },

  post: function(path, data, options) {
    return (
      request.post(path, data, options)
    );
  },

  put: function(path, data, options) {
    return (
      request
      .put(path, data, options)
    );
  }
}
