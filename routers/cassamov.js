const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassamov = require('../controllers/cassamovController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , cassamov.getAllcassamov);
router.get('/' , [authjwt.verifyToken], cassamov.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , cassamov.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], cassamov.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], cassamov.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], cassamov.delete);

// lettura singolo utente
router.get('/cassa/All/:id', [authjwt.verifyToken] , cassamov.getAllbyCassa);    // 

module.exports = router;