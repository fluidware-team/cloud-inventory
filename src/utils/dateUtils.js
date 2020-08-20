/**
 * it takes @date and returns it as DD-MM-YYYY
 * @param {Date} date
 * @returns {string}
 */
export const getDateAsMysqlString = function(date) {
  if (!date) {
    return '-';
  }
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

/**
 * it takes @date and returns it as DD-MM-YYYY
 * @param {Date} date
 * @returns {string}
 */
export const getDateTimeAsMysqlString = function(date) {
  if (!date) {
    return '-';
  }
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${
    hours < 10 ? '0' + hours : hours
  }:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

/**
 * it takes @date and returns it as DD-MM-YYYY
 * @param {Date} date
 * @returns {string}
 */
export const getDateAsString = function(date) {
  if (!date) {
    return '-';
  }
  if (!(date instanceof Date)) {
    throw new Error('getDateAsString needs a date');
  }
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
};

/**
 * it takes @date and returns it as DD-MM-YYYY HH:MI:SS string
 * @param {Date} date
 * @returns {string}
 */
export const getDateTimeAsString = function(date) {
  if (!date) {
    return '-';
  }
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year} ${
    hours < 10 ? '0' + hours : hours
  }:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

export const addDaysToDate = function(date, howmany = 1) {
  return new Date(date.setDate(date.getUTCDate() + howmany));
};

export const addMonthsToDate = function(date, howmany = 1) {
  return new Date(date.setMonth(date.getUTCMonth() + howmany));
};

export const addYearsToDate = function(date, howmany = 1) {
  return new Date(date.setFullYear(date.getUTCFullYear() + howmany));
};

export const getTomorrow = function(date) {
  if (!date) {
    date = new Date();
  }
  return new Date(date.setDate(date.getUTCDate() + 1));
};
