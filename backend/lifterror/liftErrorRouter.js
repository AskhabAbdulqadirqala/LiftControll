const Router = require('express')
const controller = require('./liftErrorController')
const controllerTest = require('./test')
const { check } = require('express-validator')
const roleMiddleware = require("../roleMiddleware");

const router = new Router()

router.post('/newlifterror', [
    //check('liftID', 'liftID не может быть пустым').notEmpty(),
    //check('installDate', 'installDate не может быть пустым').notEmpty()
], controller.newLiftError)
/*router.post('/newschange', [
    check('title', 'Заголовок не может быть пустым').notEmpty(),
    check('text', 'Текст новости не может быть пустым').notEmpty()
], controller.newschange)
*/
router.get('/lifterrors', controller.getLiftErrors)
router.get('/lifterrorstomoder', controller.getLiftErrorsToModer)
router.get('/lifterrorstomodertest', controllerTest.getLiftErrors)
router.get('/lifterrorstodistribute', controller.getLiftErrorsToDistribute)
router.get('/fixed', controller.getFixed)
router.post('/lifterror', check('ID', 'ID не может быть пустым').notEmpty(), controller.getLiftError)
router.post('/deletelifterror', check('ID', 'liftID не может быть пустым').notEmpty(), controller.deleteLiftError)
module.exports = router;
