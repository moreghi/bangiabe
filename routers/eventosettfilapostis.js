const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const eventosettfila = require('../controllers/eventosettfilapostiController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , eventosettfila.getAlleventosettfila);
router.get('/' , [authjwt.verifyToken], eventosettfila.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , eventosettfila.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], eventosettfila.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], eventosettfila.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], eventosettfila.delete);

// lettura eventi della manifestazione
router.get('/getbyevento/:id', [authjwt.verifyToken] , eventosettfila.getbyevento);    // 

// conteggio per settore/fila
router.get('/count/:id', [authjwt.verifyToken] , eventosettfila.getCountbysettfila);


module.exports = router;
