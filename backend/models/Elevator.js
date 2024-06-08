const { Schema, model } = require('mongoose')

const Elevator = new Schema({
    type: {type: String, required: true},
    adress: {type: String, required: true},
    coordX: {type: String, required: true},
    coordY: {type: String, required: true},    
    installDate: {type: Date, required: true},
    journal: {type: String}
})
module.exports = model('Elevator', Elevator)