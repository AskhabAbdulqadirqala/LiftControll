const Router = require('express')
const controller = require('./elevController')
const { check } = require('express-validator')
const roleMiddleware = require("../roleMiddleware");

const router = new Router()

router.post('/newelevator', [
    check('adress', 'adress не может быть пустым').notEmpty(),
], controller.newElevator)

router.get('/elevs', controller.getElevs)
router.post('/elev', check('ID', 'ID не может быть пустым').notEmpty(), controller.getElev)
router.post('/deleteelev', check('ID', 'ID не может быть пустым').notEmpty(), controller.deleteElev)
module.exports = router;
