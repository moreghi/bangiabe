// tabella t_stato_manifestaziones  -  
const express = require('express');
const router = express.Router();

const authjwt  = require('../middleware/authJwt');

const tstatomanif = require('../controllers/TstatomanifestazionesController');

// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], tstatomanif.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], tstatomanif.getbyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tstatomanif.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], tstatomanif.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tstatomanif.delete);
// lettura ultimo id
router.get('/lastid', [authjwt.verifyToken], tstatomanif.getLastId);

module.exports = router;