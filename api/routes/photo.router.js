const { getAllPhotos, getOnePhoto, getFamPhoto, getAllFamPhotos, createPhoto, deletePhoto } = require('../controllers/photo.controller')
const { checkAuth, checkAdmin} = require("../middleware")

const router = require('express').Router()

router.get('/admin', checkAuth, checkAdmin, getAllPhotos)
router.get('/:photoId', checkAuth, getFamPhoto)
router.get('/', checkAuth, getAllFamPhotos)
router.get('/admin/:id', checkAuth, checkAdmin, getOnePhoto)
router.post('/', checkAuth, createPhoto)
router.delete('/:id', checkAuth, deletePhoto)


module.exports = router