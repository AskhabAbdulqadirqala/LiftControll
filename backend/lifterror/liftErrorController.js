const { validationResult } = require('express-validator')
const LiftError = require("../models/LiftError");
const Elevator = require("../models/Elevator");
const mongoose = require('mongoose')

class liftErrorController {

    async newLiftError(req, res) {
        try {
            const reqerrors = validationResult(req)
            if (!reqerrors.isEmpty()) return res.status(400).json({message: 'Post error', reqerrors});
            const {liftID, issueCategory, description, date, moderated, fixed} = req.body;
            const candidate1 = await LiftError.findOne({liftID, issueCategory, description, date})
            if (candidate1) return res.status(400).json({message: 'Error already posted'});
            const liftError = new LiftError({liftID, issueCategory, description, date, moderated, fixed})
            await liftError.save()
            return res.json({message: 'liftError successfully posted'})
        }  catch (e){
            console.log(e)
            res.status(400).json({message: "Posting error"})
        }
    }
    async getLiftErrors(req, res) {
        try {
            const liftErrors = await LiftError.find()
            res.json(liftErrors)
        } catch (e){
            console.log(e)
        }
    }
    async getLiftErrorsToModer(req, res) {
        try {
            const liftErrors = await LiftError.find({moderated: false})
            let elevators = [];

            for (let error of liftErrors) {
                const elevator = await Elevator.findOne({_id: error.liftID})
                if (elevator) elevators.push(elevator);
            }
            liftErrors.push(elevators);
            console.log(liftErrors)
            return res.json(liftErrors)
        } catch (e){
            console.log(e)
        }
    }
    async getLiftErrorsToDistribute(req, res) {
        try {
            const liftErrors = await LiftError.find({moderated: true, service: 0, fixed: false})
            let elevators = [];

            for (let error of liftErrors) {
                const elevator = await Elevator.findOne({_id: error.liftID})
                if (elevator) elevators.push(elevator);
            }
            liftErrors.push(elevators);
            return res.json(liftErrors)
        } catch (e){
            console.log(e)
        }
    }
    async getFixed(req, res) {
        try {
            const liftErrors = await LiftError.find({moderated: true, fixed: false, service: !false})
            let elevators = [];

            for (let error of liftErrors) {
                const elevator = await Elevator.findOne({_id: error.liftID})
                if (elevator) elevators.push(elevator);
            }
            liftErrors.push(elevators);
            return res.json(liftErrors)
        } catch (e){
            console.log(e)
        }
    }
    async getLiftError(req, res) {
        try {
            const { ID } = req.body;
            const liftError = await LiftError.findOne({_id: ID})
            if (!liftError) return res.status(400).json({message: `liftError not found`})
            return res.json({ liftError: liftError })
        } catch (e){
            console.log(e)
        }
    }
    async deleteLiftError(req, res) {
        try {
            const { ID } = req.body;
            const liftError = await LiftError.findOne({_id: ID})
            if (!liftError) return res.status(400).json({message: `liftError not found`})
            const liftError2 = await LiftError.deleteOne({_id: ID})
            return res.json('Success')
        } catch (e){
            console.log(e)
        }
    }

}

module.exports = new liftErrorController()