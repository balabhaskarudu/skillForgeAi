import {
  cleanEnv,
  port,
  str,
} from 'envalid';

export const env = cleanEnv(
  process.env,
  {
    PORT: port({
      default: 5000,
    }),

    MONGODB_URI: str(),

    JWT_SECRET: str(),

    JWT_EXPIRES_IN: str(),

    GEMINI_API_KEY: str(),
  }
);