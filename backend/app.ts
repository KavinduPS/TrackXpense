require ('dotenv').config
const PORT = process.env.PORT
const server = () => {
    console.log('Listening to PORT: ', PORT)
}