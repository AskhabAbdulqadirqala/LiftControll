const { Schema, model } = require('mongoose')

const Adress = new Schema({
    adress: {type: String, required: true},
    coordX: {type: String, required: true},
    coordY: {type: String, required: true},
    elevators: [{type: String, ref: 'Elevator'}]
})
module.exports = model('Adress', Adress)