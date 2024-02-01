// const { Op } = require('sequelize');
const Family = require('../models/family.model')
const User = require("../models/user.model");

async function getAllFamilies(req, res) {
    try {
        const families = await Family.find()
        return res.status(200).json(families)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getFamilyById(req, res) {
    try {
        const family = await Family.findById(req.params.id)
        if (family) {
            return res.status(200).json(family)
        } else {
            return res.status(404).send('Family not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllFamProfiles(req, res) {
    try {
        const user = await User.findById(res.locals.user.id).populate('familyId')
            if (!user || !user.family) {
                return res.status(404).send("User not found in the family");
            }
        const familyMembers = await User.find({
                familyId: user.familyId,
                _id: { $ne: user._id }
        }).populate('familyId');
        
        if (!familyMembers || familyMembers.length === 0) {
            return res.status(404).send("Family members not found");
        }

        return res.status(200).json(familyMembers);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Solo se crea familia cuando se hace el SignUp, por lo que no necesitamos createFamily
/* async function createFamily(req, res) {
    try {
        const family = await Family.create({ family_name: req.body.family_name })
        return res.status(200).json(family)
    } catch (error) {
        return res.status(500).send(error.message)
    }
} */

async function updateFamily(req, res) {
    try {
        const family = await Family.findByIdAndUpdate(req.body, req.params.id, { new: true })
        if (family == 0) {
            return res.status(404).send("Family not found")
        }
        return res.status(200).send("Family has been updated")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteFamily(req, res) {
    try {
        const family = await Family.findByIdAndDelete(req.params.id);
        if (!family) {
            return res.status(404).send("Family not found")
        }
        return res.status(200).send("Family removed")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//if role master->delete family

module.exports = {
    getFamilyById,
    getAllFamilies,
    getAllFamProfiles,
    updateFamily,
    deleteFamily
}


