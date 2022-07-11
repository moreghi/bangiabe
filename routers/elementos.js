const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const elemento = require('../controllers/elementoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , elemento.getAllelemento);
router.get('/' , [authjwt.verifyToken], elemento.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , elemento.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], elemento.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], elemento.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], elemento.delete);

// cancellazione globale
router.delete('/deleteAll', [authjwt.verifyToken], elemento.deleteAll);
// lettura singolo utente
router.get('/lastid/last', [authjwt.verifyToken] , elemento.getlastid);    // 

module.exports = router;