const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const socio = require('../controllers/socioController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , socio.getAllsocio);
router.get('/' , [authjwt.verifyToken], socio.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , socio.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], socio.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], socio.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], socio.delete);

// ricerca per lastId    
router.get('/Socio/lastid', [authjwt.verifyToken] , socio.getLastid);

module.exports = router;

