const { getAllUsers, getOneUser, getProfile, getFamProfile, updateUser, deleteUser } = require("../controllers/user.controller");
const { checkAuth, checkAdmin, checkMaster } = require("../middleware/index");

const router = require("express").Router();

router.get("/admin", checkAuth, checkAdmin, getAllUsers);
router.get("/admin/:id", checkAuth, checkAdmin, getOneUser);
router.get("/profile", checkAuth, getProfile);
router.get("/profile/:id", checkAuth, getFamProfile);
// router.post("/", checkAuth, checkMaster, createUser);
router.put("/", checkAuth, updateUser);
router.patch("/:id", checkAuth, updateUser);
router.delete("/:id", checkAuth, checkMaster, deleteUser);

module.exports = router;