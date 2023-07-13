const express = require('express')
const AuthController = require('../controllers/AuthController')
const router = express.Router();

router.get('/register', AuthController.showRegister)
router.get('/login', AuthController.showLogin)
router.get('/logout', AuthController.logout)
router.post('/register', AuthController.register)
router.post('/login', AuthController.auth)

module.exports = router;