import { comparePasswords, createJWT, hashPassword } from '../helper.js'
import User from '../model/user.js'

export const signIn = async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const match = await comparePasswords(req.body.password, user.password)
        if (match) {
            const token = createJWT(user)
            res.send({ user: user, token: token })
            return
        } else {
            res.status(401).json('In valid Credentials')
        }
    } else {
        res.status(401).json('User does not exist')
    }
}

export const createUser = async (req, res) => {
    const data = req.body
    if (!(data.email && data.name && data.name.first && data.password)) {
        res.status(400).send('Provide All Required Field')
        return
    }
    const checkUser = await User.findOne({ email: req.body.email })
    if (checkUser) {
        res.status(400).send({ message: 'User with the same email exists!' })
        return
    }

    const hashedPassword = await hashPassword(req.body.password)
    try {
        const newUser = new User({
            email: data.email.trim().toLowerCase(),
            password: data.password,
            name: {
                first: data.name.first.trim(),
                last: data.name.last ? data.name.last.trim() : '',
            },
        })
        const user = await newUser.save()
        res.send({ user: user })
    } catch (err) {
        res.status(400).send(err.errors)
    }
}
