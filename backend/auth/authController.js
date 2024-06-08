const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jsw = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles
    }
    return jsw.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Registration error', errors});

            const { username, email, password } = req.body;
            const candidate2 = await User.findOne({ username })
            if (candidate2) return res.status(400).json({message: 'Login already taken'});

            const candidate1 = await User.findOne({ email })
            if (candidate1) return res.status(400).json({message: 'Email already taken'});

            const hashPassword  = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, email ,password: hashPassword, roles:[userRole.value] })
            await user.save()
            return res.json({message: 'User successfully authorised'})
        } catch (e){
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log(req.body);
            const user = await User.findOne({username})
            if (!user) return res.status(400).json({message: `User not found`})

            if (password) {
                const validPassword = bcrypt.compareSync(password, user.password)
                if (!validPassword) return res.status(400).json({message: `Wrong password`})
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token, login: user.username, email: user.email, roles: user.roles })
        } catch (e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }
    async updateAuthData(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(400).json({message: 'Updating error (validation)', errors});

            const { oldLogin, newLogin, oldEmail, newEmail, isLoginSame, isEmailSame } = req.body;
            const candidate1 = await User.findOne({ username: newLogin })
            const candidate2 = await User.findOne({ email: newEmail })
            if ((candidate1 && !isLoginSame) || (candidate2 && !isEmailSame))
                return res.status(400).json({message: 'Логин или Email уже заняты'});

            User.findOneAndUpdate(
                { username: oldLogin, email: oldEmail},
                { username: newLogin, email: newEmail},
                { new: true },
                function (err) {
                    if (err) return res.json({message: 'Updating error'})
                }
            );
            return res.json({message: 'Success'})
        } catch (e){
            res.status(400).json({message: "Login changing error"})
        }
    }
    async checkPassword(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({username})
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) return res.status(400).json({message: `Wrong password`})
            return res.json({message: 'Success'})
        } catch (e) {
            res.status(400).json({message: "Password checking error"})
        }
    }
    async getUsers(req, res) {
        try {
            /*const users = await User.find()
            const us = new Role({value: 'MODER'});
            await us.save()*/
        } catch (e){
            console.log(e)
        }
    }
}

module.exports = new authController()