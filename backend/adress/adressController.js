const { validationResult } = require('express-validator')
const Adress = require("../models/Adress");

class adressController {
    async newAdress(req, res) {
        try {
            const reqerrors = validationResult(req)
            if (!reqerrors.isEmpty()) return res.status(400).json({message: 'Post error', reqerrors});

            const {adress, coordX, coordY, elevators} = req.body;
            const candidate1 = await Adress.findOne({adress})
            if (candidate1) return res.status(400).json({message: 'adress already taken'});
            const newadr = new Adress({adress, coordX, coordY, elevators})
            await newadr.save()
            return res.json({message: 'Adress successfully posted'})
        }  catch (e){
            console.log(e)
            res.status(400).json({message: "Posting error"})
        }
    }
    async getAdresses(req, res) {
        try {
            const adress = await Adress.find()
            console.log(adress);
            res.json(adress)
        } catch (e){
            console.log(e)
        }
    }

}

module.exports = new adressController()