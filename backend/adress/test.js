const { validationResult } = require('express-validator')
const Adress = require("../models/Adress");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class controllerTest {
    async newAdressTest(req, res) {
        try {
            return res.json({message: 'Hi'})
        }  catch (e){
            console.log(e)
            res.status(400).json({message: "Posting error"})
        }
    }
    async getAdressesTest(req, res) {
        try {
            res.json(adress)
        } catch (e){
            console.log(e)
        }
    }

}


const adress = []
const bigDataLength = 30000;
for (let i=0; i<bigDataLength; i++){
    adress.push({
        _id: 24623472373242,
        adress: 'Адрес' + i,
        coordX: 55.129954,
        coordY: 37.449611,
        elevators: [ '664669342704eae5502846cc', '6646694a2704eae5502846d1' ],        
        __v: 0
      })
}


module.exports = new controllerTest()