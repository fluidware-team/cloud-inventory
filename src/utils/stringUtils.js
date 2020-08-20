export const lpad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const getKeyValFromSearch = function(string, defaultKey) {
  if (string.indexOf(':') < 1) {
    return { [defaultKey]: string.replace(/"/g, '').replace(/'/g, '') };
  }
  const regexp = /[a-zA-Z0-9-$\\/.]+(:("[^"]*"|'[^']*'|[a-zA-Z0-9-%\\/.]+))*/gm;
  const matches = string.match(regexp);
  const ret = {};
  matches.forEach(match => {
    // console.log('match', match);
    const pos = match.indexOf(':');
    if (pos > 0) {
      const key = match.substr(0, pos);
      const value = match.substr(pos + 1);
      // console.log('key: %s -> value: %s', key, value);
      ret[key] = value.replace(/"/g, '').replace(/'/g, '');
    } else {
      ret[defaultKey] = match;
    }
  });
  return ret;
};
