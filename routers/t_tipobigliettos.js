const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const tipobiglietto = require('../controllers/tipobigliettoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , tipobiglietto.getAlltipobiglietto);
router.get('/' , [authjwt.verifyToken], tipobiglietto.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , tipobiglietto.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tipobiglietto.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], tipobiglietto.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tipobiglietto.delete);

// lettura eventi della manifestazione
router.get('/getbyevento/:id', [authjwt.verifyToken] , tipobiglietto.getbyevento);    

// lettura taglia per evento
router.get('/getbytaglia/:id/:idtaglia', [authjwt.verifyToken] , tipobiglietto.getbytaglia);    

module.exports = router;