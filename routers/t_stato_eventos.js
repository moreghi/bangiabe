// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
const tstatoev = require('../controllers/TstatoeventosController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], tstatoev.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], tstatoev.getbyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tstatoev.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], tstatoev.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tstatoev.delete);
// lettura ultimo id
router.get('/lastid', [authjwt.verifyToken], tstatoev.getLastId);


module.exports = router;