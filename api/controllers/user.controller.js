const Family = require("../models/family.model");
const User = require("../models/user.model");
const dayjs = require('dayjs')
const bcrypt = require('bcrypt')


async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getOneUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(500).send("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getProfile(req, res) {
  try {
    console.log('hola')
    const user = await User.findById(res.locals.user.id);
    if (!user) {
      res.status(500).send("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getFamProfile(req, res) {
  try {
    const famProfile = await User.findById(req.params.id);
    const user = await User.findById(res.locals.user.id, {
      include: Family,
    });
    const familyMember = await User.findOne({
      where: {
        id: famProfile.id,
        familyId: user.family.id,
      },
    });
    if (!familyMember) {
      return res.status(404).send("Family member not found");
    }

    return res.status(200).json(familyMember);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

//Crear usuario se hará desde la invitación por email, por lo que no es necesaria la función createUser.
/* async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}  */

/* async function updateUser(req, res) {
const password = req.body.password
const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
const hashedPassword = bcrypt.hashSync(password, saltRounds)
req.body.password = hashedPassword

  const newDate = dayjs(req.body.dob, "MM-DD-YYYY").format("YYYY-MM-DD");
  try {
    const user = await User.findByIdAndUpdate(res.locals.user.id, 
      {
        ...req.body,
        dob: newDate,
        password: hashedPassword
      }, { new: true });

    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User has been updated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
} */

async function updateUser(req, res) {
  // Inicializa un objeto para almacenar los campos que se actualizarán
  const updateData = {
    ...req.body
  };

  // Solo actualiza la contraseña si se ha proporcionado una nueva en la solicitud
  if (req.body.password) {
    const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    updateData.password = hashedPassword;
  }

  // Formatea la fecha de nacimiento si se proporciona
  if (req.body.dob) {
    updateData.dob = dayjs(req.body.dob, "MM-DD-YYYY").format("YYYY-MM-DD");
  }

  try {
    // Actualiza el usuario en la base de datos
    const user = await User.findByIdAndUpdate(res.locals.user.id, updateData, { new: true });

    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User has been updated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ text: "User removed", user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  getProfile,
  getFamProfile,
  updateUser,
  deleteUser
};
