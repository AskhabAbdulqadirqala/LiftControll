const Router = require('express')
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./authMiddleware')
//const roleMiddleware = require('../roleMiddleware')

const router = new Router()

router.post('/registration', [
    check('username', 'Логин не может быть пустым').notEmpty(),
    check('password', 'Длина пароля должна быть больше 4').isLength({min: 4})
], controller.registration)
router.post('/login', controller.login)
router.post('/checkpassword', controller.checkPassword)
router.patch('/updateauthdata', [
    check('newLogin', 'Логин не может быть пустым').notEmpty(),
    check('newEmail', 'Email не может быть пустым').notEmpty()
], controller.updateAuthData)
router.get('/users', /*roleMiddleware(["ADMIN"]), */controller.getUsers)

module.exports = router;
