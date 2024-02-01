const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Family = require('../models/family.model')
const { generatePassword } = require('./verified_email.controller')

async function signup(req, res) {
    const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUND))
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashedPassword
    try {
        // console.log(req.body.family_name)
        const family = await Family.create({ family_name: req.body.family_name })
        req.body.role = "master"
        const user = await User.create({ ...req.body, familyId: family.id })
        const payload = { email: user.email }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
        return res.status(200).json({ token: token })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        // console.log(user)
        if (!user) return res.status(404).send('Error: Email or password incorrect')
        const comparePass = bcrypt.compareSync(req.body.password, user.password)
        if (comparePass) {
            const payload = { email: user.email }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
            return res.status(200).send({ token: token, id: user.id })
        } else {
            return res.status(404).send('Error: Email or Password incorrect')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function loginGuest(req, res) {
    try {
        const guestUser = await User.findOne({
            email: req.body.email,
            password: generatePassword()
        })
        if (!guestUser) return res.status(404).send('Error: Email or password incorrect')
        const comparePass = bcrypt.compareSync(req.body.password, guestUser.password)

        if (comparePass) {
            const payload = { email: guestUser.email }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
            return res.status(200).send({ token: token })
        } else {
            return res.status(404).send('Error: Email or Password incorrect')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { signup, login, loginGuest }