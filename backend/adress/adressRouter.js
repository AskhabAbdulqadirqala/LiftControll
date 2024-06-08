const Router = require('express')
const controller = require('./adressController')
const controllerTest = require('./test')
const { check } = require('express-validator')

const router = new Router()

router.post('/newAdress', [], controller.newAdress)
router.get('/getadresses', controller.getAdresses)
router.post('/newAdressTest', [], controllerTest.newAdressTest)
router.get('/getadressesTest', controllerTest.getAdressesTest)


module.exports = router;
