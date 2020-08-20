export const buildURL = path => {
  return process.env.PUBLIC_URL + path;
};

export const getBasicAuth = (user, pwd) => {
  return Buffer.from(user + ':' + pwd, 'utf8').toString('base64');
};
