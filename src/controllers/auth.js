import { comparePasswords, createJWT, hashPassword } from '../helper.js'
import User from '../model/user.js'

export const signIn = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const match = await comparePasswords(req.body.password, user.password)
        if (match) {
            const token = createJWT(user)
            res.send({ token: token })
        }
    } else {
        res.status(401).json({ message: 'In valid Credentials' })
    }
}

export const createUser = async (req, res) => {
    const checkUser = await User.findOne({ email: req.body.email })

    if (checkUser) {
        res.send(400).json({ message: 'User already Exists' })
        return
    }
    const hashedPassword = await hashPassword(req.body.password)
    const newUser = await new User({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
    })

    const user = await newUser.save()

    res.send({ ok: 'success', message: user })
}
