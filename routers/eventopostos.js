const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const eventoposto = require('../controllers/eventopostoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , eventoposto.getAlleventoposto);
router.get('/' , [authjwt.verifyToken], eventoposto.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , eventoposto.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], eventoposto.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], eventoposto.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], eventoposto.delete);

// lettura eventi della manifestazione
router.get('/getbyevento/:id', [authjwt.verifyToken] , eventoposto.getbyevento);    // 

// verifica se presenti eventi attivi
router.get('/getbyStato/:id/:stato', [authjwt.verifyToken] , eventoposto.getbyStato);    // 
// lettura posti per settore/fila
router.get('/getbyevento/SettFila/:id/:idSett/:idFila', [authjwt.verifyToken] , eventoposto.getbyIdEventoSettFila);    // 
// lettura posti per settore/fila solo liberi
router.get('/getbyevento/SettFilaActive/:id/:idSett/:idFila', [authjwt.verifyToken] , eventoposto.getbyIdEventoSettFilaActive);    // 
// lettura posti per codice prenotazione
router.get('/getbyevento/keyuserpren/:keyuserpren', [authjwt.verifyToken] , eventoposto.getbykeyuserpren);    // 
     
module.exports = router;

