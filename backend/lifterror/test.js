const { validationResult } = require('express-validator')
const LiftError = require("../models/LiftError");
const Elevator = require("../models/Elevator");

class controllerTest {
    async getLiftErrors(req, res) {
        try {
            const liftErrors = []
            const bigDataLength = 100;

            for (let i=0; i<bigDataLength; i++){
                liftErrors.push({   
                    _id: "66466ab32704eae5502846dd",
                    liftID: '664669342704eae5502846cc',
                    issueCategory: 'Некорректная нагрузка на лифт',
                    description: 'Сработал датчик нагрузки',
                    date: new Date("2024-05-16T20:21:07.583Z"),
                    moderated: false,
                    service: 0,
                    fixed: false,
                    __v: 0
                  })
            }
            let elevators = [];
            for (let error of liftErrors) {
                const elevator = await Elevator.findOne({_id: error.liftID})
                if (elevator) elevators.push(elevator);
            }
            liftErrors.push(elevators);
            res.json(liftErrors)
        } catch (e){
            console.log(e)
        }
    }
}





module.exports = new controllerTest()