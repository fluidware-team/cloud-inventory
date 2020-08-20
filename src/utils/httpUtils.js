import fetch from 'node-fetch';

const execute = (method, path, data, headers = {}) => {
  if (!headers.Connection) {
    headers.Connection = 'Close';
  }
  const fetchOpts = {
    method,
    headers
  };
  const dataType = typeof data;
  if (dataType !== 'undefined') {
    if (dataType !== 'string') {
      data = JSON.stringify(data);
    }
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    fetchOpts.body = data;
  }
  return fetch(path, fetchOpts).then(res => {
    if (res.status >= 400) {
      const error = new Error(res.statusText);
      error.http_code = res.status;
      error.http_response = res;
      throw error;
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.toLowerCase().indexOf('application/json') >= 0) {
      return res.json();
    }
    return res.text();
  });
};

export const http_get = (path, headers) => {
  return execute('GET', path, undefined, headers);
};

export const http_del = (path, data, headers) => {
  return execute('DELETE', path, data, headers);
};

export const http_put = (path, data, headers) => {
  return execute('PUT', path, data, headers);
};

export const http_post = (path, data, headers) => {
  return execute('POST', path, data, headers);
};
