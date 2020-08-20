import crypto from 'crypto';

export const generateToken = (bytes = 48) => {
  return crypto.randomBytes(bytes).toString('hex');
};
