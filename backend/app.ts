require ('dotenv').config
const PORT = process.env.PORt
const server = () => {
    console.log('Listening to PORT: ', PORT)
}