const Message = require("../models/message.model");
const User = require("../models/user.model");
const Family = require("../models/family.model")

async function getAllMessages(req, res) {
  try {
    const messages = await Message.find();
    if (messages && messages.length > 0) {
      return res.status(200).json(messages);
    } else {
      return res.status(404).send("No messages");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}



async function getOneMessage(req, res) {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      return res.status(200).json(message);
    } else {
      return res.status(404).send("Message not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllFamMessages(req, res) {
  try {
    const currentUser = await User.findById(res.locals.user.id).populate('familyId');
    if (!currentUser.familyId) {
      return res.status(404).send("User does not belong to any family.");
    }

    // Encuentra usuarios que pertenecen a la misma familia
    const familyMembers = await User.find({ familyId: currentUser.familyId });

    // Extrae los IDs de los miembros de la familia
    const memberIds = familyMembers.map(member => member._id);

    // Encuentra mensajes donde el emisor o el receptor es un miembro de la familia
    const familyMessages = await Message.find({
      $or: [{ senderId: { $in: memberIds } }, { receiverId: { $in: memberIds } }]
    }).populate('senderId receiverId');

    return res.status(200).json(familyMessages);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


async function getOneFamMessages(req, res) {
    try {
      const user = await User.findById(res.locals.user.id)
      const userR = await User.findById(req.params.id, {
        include: Family,
      });
      const familyMessage = await Message.find({
        where: {
          receiver_id: userR.id,
          userId: user.id
        }
      });
      if (!familyMessage || familyMessage.length === 0) {
        return res.status(404).send("Not messages in the Family");
      }
      return res.status(200).json(familyMessage);
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

async function createMessage(req, res) {
  try {
    const messageData = {
      senderId: res.locals.user.id, // ID del usuario autenticado como emisor
      receiverId: req.body.receiverId, // Deberías pasar el ID del receptor en el cuerpo de la solicitud
      message: req.body.message,
    };

    const message = await Message.create(messageData);
    return res.status(201).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function deleteOneMessage(req, res) {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (message) {
      return res.status(200).send("Message deleted");
    } else {
      return res.status(404).send("Message not found");
    }
  } catch {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllMessages,
  getOneMessage,
  getAllFamMessages,
  getOneFamMessages,
  createMessage,
  deleteOneMessage,
};
