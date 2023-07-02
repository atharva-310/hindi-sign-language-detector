import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
/**
 *  Middlware will be used to verify the logged in user visiting the protected routes
 *  Will append the user Object on the request object
 */

export const Authenticator = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401)
        res.send('NOT AUTHORISED')
        return
    }

    const [, token] = bearer.split(' ')
    console.log(token)
    if (!token) {
        res.status(401)
        res.send('NOT AUTHORISED')
        return
    }

    try {
        const payload = jwt.verify(token, 'it is a secret')
        req.user = payload
        next()
        return
    } catch (err) {
        console.log(err)
        res.send(402)
        res.send('NOT A VAILD TOKEN')
        return
    }
}

// Input Error Handling Middleware based on express validator
export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400)
        res.json({
            errors: errors.array(),
        })
        return
    }
    next()
}
