const express = require("express");
const router = express.Router();
const tournamentController = require('../controllers/tournamentController')

router.post('/', tournamentController.postTournament)
router.get('/', tournamentController.getAllTournaments)
router.put('/:id', tournamentController.updateTournament)
router.delete('/:id', tournamentController.deleteTournament)

module.exports = router;