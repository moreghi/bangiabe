const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const tipologistica = require('../controllers/tipologisticaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , tipologistica.getAlltipologistica);
router.get('/' , [authjwt.verifyToken], tipologistica.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , tipologistica.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tipologistica.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], tipologistica.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tipologistica.delete);

module.exports = router;