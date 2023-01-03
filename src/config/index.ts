export const configs = {
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secretKey',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '60s',
};
