const express = require('express');
const router = express.Router();

const authjwt  = require('../middleware/authJwt');

const truolos = require('../controllers/TruolosController');


// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], truolos.getAllRuoli);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], truolos.getRuolobyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], truolos.createNewRuolo);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], truolos.updateRuoloByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], truolos.deleteRuolo);


module.exports = router;