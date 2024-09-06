import { Hono} from 'hono'
import {cors} from 'hono/cors'
import { prisma } from './db/db'
import { ProfileMiddleware, RegisterValidator } from './middleware/UserMiddleware'
import { GetUserProfileController, GithubAuthController, GithubAuthControllerCallback, GoogleAuthCallbackController, GoogleAuthController, LoginUserController, RegisterUserController } from './controller/UserController'
import lucia from 'lucia-auth'
import { google } from 'googleapis'
import {google as Google} from '@lucia-auth/oauth/providers'
import {github as Github} from '@lucia-auth/oauth/providers'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { serve } from 'bun'


prisma.$connect()
const adapter:any=new PrismaAdapter(prisma.session,prisma.user)
const googleConfig={
  clientId:process.env.GOOGLE_CLIENT_ID as string,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
  redirectUri:process.env.GOOGLE_REDIRECT_URI as string,
  scope:['openid','profile','email']
}
const githubConfig={
  clientId:process.env.GITHUB_CLIENT_ID as string,
  clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
  redirectUri:process.env.GTIHUB_REDIRECT_URI
} 
export const auth=lucia({
  adapter:()=>adapter,
  secret:process.env.LUCIA_SECRET,
  env:process.env.PROFILE as any
} as any)

export const GithubAuth=Github(auth as any,githubConfig)

export const GoogleAuth=Google(auth as any, googleConfig)
export const oauth2Client=new google.auth.OAuth2(googleConfig)

const app = new Hono()

app.use(cors())
app.get('/',c=>c.text('Welcome to My Hono Auth api'))
app.post('/auth/register',RegisterValidator,RegisterUserController)
app.post('/auth/login',LoginUserController)
app.get('/account/profile',ProfileMiddleware,GetUserProfileController)
app.get('/auth/oauth/google',GoogleAuthController)
app.get('/auth/oauth/google/callback',GoogleAuthCallbackController)
app.get('/auth/oauth/github',GithubAuthController)
app.get('/auth/oauth/github/callback',GithubAuthControllerCallback)

const port=process.env.PORT


app.fire()

console.log(`Server running at port ${port} 👌👍👍`)
export default app
