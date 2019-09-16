require('dotenv').config();

module.exports = {
  DEV_DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_TEST: process.env.DEV_DATABASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  DIALECT: process.env.DIALECT,
  PG_HOST: process.env.PG_HOST,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY,
  LINKEDIN_SECRET_KEY: process.env.LINKEDIN_SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  frontEndUrl: process.env.FRONT_END_URL,
  USER_MAIL: process.env.USER_MAIL,
  PASSWORD_MAIL: process.env.PASSWORD_MAIL
};
