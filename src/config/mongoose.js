import mongoose, { modelNames } from 'mongoose'

export async function connectDatabase() {
    await mongoose.connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}
export const DB = mongoose.connection
DB.on('error', (err) => {
    console.log(err)
})
DB.on('open', () => {
    console.log('Database Connected')
})
