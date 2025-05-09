const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/teams', teamController.addTeam);
router.get('/teams', teamController.getTeams);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);
router.post('/teams/start-timer', teamController.startTimer);
router.post('/teams/:id/stop-timer', teamController.stopTimer);
router.get('/teams/sorted', teamController.getSortedTeams);
router.post('/reset-timers', teamController.resetTimers);

module.exports = router;
