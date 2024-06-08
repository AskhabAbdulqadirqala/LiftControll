const { Schema, model } = require('mongoose')

const LiftError = new Schema({
    liftID: {type: String, required: true},
    issueCategory: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    moderated: {type: Boolean, default: false},
    service: {type: Number, default: 0},
    fixed: {type: Boolean, default: false},
})
module.exports = model('LiftError', LiftError)