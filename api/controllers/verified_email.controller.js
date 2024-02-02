const User = require('../models/user.model')
const VerifiedEmail = require('../models/verified_email.model')
const { mailer } = require('../../mailer/index')
const { sendMailCreateAccount } = require('../../mailer/senders')
const bcrypt = require('bcrypt')


async function getAllVerifiedEmails(req, res) {
    try {
        const verified_emails = await VerifiedEmail.find()
        return res.status(200).json(verified_emails)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneVerifiedEmail(req, res) {
    try {
        const verified_email = await VerifiedEmail.findById(req.params.id)
        if (!verified_email) { res.status(500).send('Verified Email not found') }
        return res.status(200).json(verified_email)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createVerifiedEmail(req, res) {
    try {
        const verified_email = await VerifiedEmail.create(req.body)
        return res.status(200).json(verified_email)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteVerifiedEmail(req, res) {
    try {
        const verified_email = await VerifiedEmail.findByIdAndDelete(req.params.id);
        if (!verified_email) {
            return res.status(404).send({ message: 'Verified Email not found' });
        }
        res.status(200).json({ message: 'Verified Email removed', verified_email: verified_email });
    } catch (error) {
        return res.status(500).send('Error: ' + error.message);
    }
}

function generatePassword() {
    var length = 10,
        char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        randomPassword = "";
    for (var i = 0, n = char.length; i < length; ++i) {
        randomPassword += char.charAt(Math.floor(Math.random() * n));
    } 
    return randomPassword;
}

const password = generatePassword()

async function sendInvitation(req, res) {
    const email = req.body.email;
    const user = await User.findById(res.locals.user.id)
    if (!user) {
        return res.status(404).send('User not found');
    }
    req.body.familyId = user.familyId
    const family = req.body.familyId
    try {
        const existingInvitation = await VerifiedEmail.findOne({email: email, familyId: family});
        if (existingInvitation) {
            return res.status(400).send('This email has already been invited.');
        }
        
        const addEmail = await VerifiedEmail.create(req.body)
        const password = generatePassword()
        const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
        const hashedPassword = bcrypt.hashSync(password, saltRounds)
        req.body.password = hashedPassword
       
        const newUser = await User.create(req.body)
        const mailOptions = sendMailCreateAccount(newUser.email, password);
        const resMail = await mailer.sendMail(mailOptions);

        res.status(200).send({ message: 'Invitation sent successfully.' });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}

module.exports = {
    getAllVerifiedEmails,
    getOneVerifiedEmail,
    createVerifiedEmail,
    deleteVerifiedEmail,
    sendInvitation, 
    generatePassword
}