const express = require('express')
const ThoughtController = require('../controllers/ThoughtController')
const router = express.Router();

const authCheck = require('../helpers/auth').checkAuth;

router.get('/', ThoughtController.showHome);
router.get('/dashboard', authCheck, ThoughtController.showDashboard);

router.get('/create', authCheck, ThoughtController.createThoughtView);
router.post('/create', authCheck, ThoughtController.createThought);
router.post('/remove', authCheck, ThoughtController.removeThought);
module.exports = router;