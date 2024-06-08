const { validationResult } = require('express-validator')
const Elevator = require("../models/Elevator");
const Adress = require('../models/Adress');

class elevController {

    async newElevator(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Post error', errors});
            const {type, adress, installDate, journal, coordX, coordY} = req.body;
            const elevator = new Elevator({type, adress, installDate, journal, coordX, coordY})
            await elevator.save()
            const candidate1 = await Adress.findOne({adress})
            if (!candidate1){
                const newadr = new Adress({adress, coordX, coordY, elevators: elevator._id})
                await newadr.save()
            }
            else {
                candidate1.elevators.push(elevator._id)
                await Adress.findOneAndUpdate(
                {adress: adress},
                {elevators: candidate1}.elevators,
                { new: true },
                )}
            return res.json({message: 'Elevator successfully posted'})
        }  catch (e){
            console.log(e)
            res.status(400).json({message: "Posting error"})
        }
    }
    async getElevs(req, res) {
        try {
            const elevs = await Elevator.find()
            res.json(elevs)
        } catch (e){
            console.log(e)
        }
    }
    async getElev(req, res) {
        try {
            const { liftID } = req.body;
            const elevator = await Elevator.findOne({_id: liftID})
            if (!elevator) return res.status(400).json({message: `elevator not found`})
            return res.json({ elevator: elevator })
        } catch (e){
            console.log(e)
        }
    }
    async deleteElev(req, res) {
        try {
            const { liftID } = req.body;
            const elevator = await Elevator.findOne({_id: liftID})
            if (!elevator) return res.status(400).json({message: `elevator not found`})
            const elevator2 = await Elevator.deleteOne({_id: liftID})
            return res.json('Success')
        } catch (e){
            console.log(e)
        }
    }

}

module.exports = new elevController()