import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Use Bcrypt compare converts the given password to hash and compare it with the hash stored in database
export const comparePasswords = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

// Use bcrypt hash function to convert password string to it's hash equivalent
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 8)
}

// Used to create a JWT Token
export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: 60 * 60 }
    )
    return token
}
