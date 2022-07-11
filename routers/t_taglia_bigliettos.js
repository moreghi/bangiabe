const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const tagliabiglietto = require('../controllers/tagliabigliettoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , tagliabiglietto.getAlltagliabiglietto);
router.get('/' , [authjwt.verifyToken], tagliabiglietto.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , tagliabiglietto.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tagliabiglietto.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], tagliabiglietto.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tagliabiglietto.delete);

module.exports = router;