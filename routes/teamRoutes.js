const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/teams', teamController.addTeam);
router.get('/teams', teamController.getTeams);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);

module.exports = router;
