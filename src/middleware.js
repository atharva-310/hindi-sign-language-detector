import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
/**
 *  Middlware will be used to verify the logged in user visiting the protected routes
 *  Will append the user Object on the request object
 */

export const Authenticator = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401).send({ status: 'error', message: 'NOT AUTHORISED' })

        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401).send({ status: 'error', message: 'NOT AUTHORISED' })
        return
    }

    try {
        const user = jwt.verify(token, 'it is a secret')
        req.userInfo = {
            user: {
                name: {
                    first: user.name.first,
                    last: user.name.last,
                },
                email: user.email,
            },
            token: token,
        }

        next()
        return
    } catch (err) {
        res.status(402).send({ status: 'error', message: 'Token is Expired' })

        return
    }
}

// Input Error Handling Middleware based on express validator
export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({
            status: 'error',
            message: 'Make sure all the field are entered corectly',
            errors: errors.array(),
        })
        return
    }
    next()
}
