import express, { urlencoded } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { body } from 'express-validator'

import { Authenticator, handleInputErrors } from './middleware.js'
import { dectector, checkUser } from './controllers/user.js'
import { createUser, signIn } from './controllers/auth.js'

const app = express()

/**
 * * * Middlewares * *
 * - bodyParser.json() -> Will parse the body with header content-type " application/json" and append it to the request body
 * - bodyParser.urlencoded([options]) -> Same as json but with content-type "application/x-www-form-urlencoded"
 *
 *
 *   https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
 */

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const buildPath = path.normalize(path.join(__dirname, '../client/build'))
app.use(express.static(buildPath))

// Auth routes
app.post(
    '/auth/create-user',
    body('name.first').exists().isString(),
    body('name.last').isString().optional(),
    body('email').isString(),
    body('password').exists().isString(),
    handleInputErrors,
    createUser
)
app.post(
    '/auth/sign-in',
    body('email').exists().isString(),
    body('password').exists().isString(),
    handleInputErrors,
    signIn
)

/**
 *  * *  Protected Routes * *
 *  /detector  -> will check whether Detector access must be granted of not
 *  /check     -> checks whether the user token is expired
 *
 *   Authenticator(middleware) -> Will verify the user token and protect the route
 */
app.get('/protected/detector', Authenticator, dectector)
app.get('/protected/check', Authenticator, checkUser)

const rootRouter = express.Router()

// all your other routes go here
rootRouter.get('*', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'))
})
app.use(rootRouter)

export default app
