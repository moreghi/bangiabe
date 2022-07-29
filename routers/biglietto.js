const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const biglietto = require('../controllers/bigliettoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , biglietto.getAllbiglietto);
router.get('/' , [authjwt.verifyToken], biglietto.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , biglietto.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], biglietto.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], biglietto.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], biglietto.delete);

// router.get('/', [authjwt.verifyToken] , biglietto.getAllbiglietto);
router.get('/last/lastid' , [authjwt.verifyToken], biglietto.getlastId);

module.exports = router;

