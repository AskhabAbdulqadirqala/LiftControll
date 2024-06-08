const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const authRouter = require('./auth/authRouter')
const elevRouter = require('./elevator/elevRouter')
const adressRouter = require('./adress/adressRouter')
const liftErrorRouter = require('./lifterror/liftErrorRouter')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)
app.use("/elev", elevRouter)
app.use("/lifterror", liftErrorRouter)
app.use("/adress", adressRouter)

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://login:password@cluster.iuvcn2h.mongodb.net/
                            ?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}  

start()
