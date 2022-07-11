const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const evento = require('../controllers/eventoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , evento.getAllevento);
router.get('/' , [authjwt.verifyToken], evento.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , evento.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], evento.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], evento.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], evento.delete);

// lettura eventi della manifestazione
router.get('/getbymanif/:id', [authjwt.verifyToken] , evento.getbymanif);    // 

// verifica se presenti eventi attivi
router.get('/getbyActive/Act', [authjwt.verifyToken] , evento.getAllActive);    // 

// lettura ultimo evento
router.get('/lastid/last', [authjwt.verifyToken] , evento.getlastid);    // 


module.exports = router;

