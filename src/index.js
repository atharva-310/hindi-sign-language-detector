// TO Access the Environment variables using process.env
import * as dontenv from 'dotenv'

import app from './app.js'
import { connectDatabase } from './config/mongoose.js'

dontenv.config()

connectDatabase().catch((err) => console.log(err))
// Running the express "app" instance on hte PORT (env)
app.listen(process.env.PORT, () => {
    console.log(`server runing on http://localhost:${process.env.PORT}`)
})
