import { get } from 'env-var';

import { loadEnv } from './env';

loadEnv();

export const getRequired = (env: string) => get(env).required();

export const config = {
  get databaseUri() {
    return getRequired('DATABASE_URL').asString();
  },
  get databaseAuthToken() {
    return getRequired('DATABASE_AUTH_TOKEN').asString();
  },
  get clientLocalUrl() {
    return getRequired('CLIENT_LOCAL_URL').asString();
  },
  get serverPort() {
    return getRequired('SERVER_PORT').asPortNumber();
  },
  get jwtSecretKey() {
    return getRequired('JWT_SECRET_KEY').asString();
  },
  get jwtRefreshTokenKey() {
    return getRequired('JWT_REFRESH_TOKEN_KEY').asString();
  },
};
