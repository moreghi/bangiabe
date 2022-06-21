const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const sociosearch = require('../controllers/sociosearchController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , sociosearch.getAllsociosearch);
router.get('/' , [authjwt.verifyToken], sociosearch.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , sociosearch.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], sociosearch.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], sociosearch.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], sociosearch.delete);

module.exports = router;