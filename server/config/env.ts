import dotenv from 'dotenv'
import { isTrue } from '../helpers'
dotenv.config()

const env = {
  environment: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  useCors: isTrue(process.env.USE_CORS),
  db: process.env.MONGO_DB,
  forceHttps: isTrue(process.env.FORCE_HTTPS),
  jwtSecret: process.env.WEB_TOKEN_SECRET,
  disableAuth: isTrue(process.env.DISABLE_AUTH),
  gmail: {
    name: process.env.GMAIL_NAME,
    email: process.env.GMAIL_EMAIL,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    redirectURI: process.env.GMAIL_REDIRECT_URI
  }
}

export default env
