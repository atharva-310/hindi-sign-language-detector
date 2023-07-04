import mongoose from 'mongoose'
import { DB } from '../config/mongoose.js'
import validatorPKG from 'validator'

/**
 * * Regex (Regular Expressions)
 * - Regular Expression, or regex or regexp in short, is extremely and amazingly powerful in searching and manipulating text strings, particularly in processing text files. One line of regex can easily replace several dozen lines of programming codes.
 * - validator library internal implements string manupulation using "Regex"
 */

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, 'Email Address required'],
            validate: {
                validator: validatorPKG.isEmail,
                message: '{VALUE} is not a valid email address',
                isAsync: false,
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        name: {
            first: {
                type: String,
                trim: true,
                require: true,
                maxLength: 30,
            },
            last: {
                type: String,
                maxLength: 30,
            },
        },
    },
    {
        timestamps: true,
    }
)

const User = DB.model('User', UserSchema)
export default User
