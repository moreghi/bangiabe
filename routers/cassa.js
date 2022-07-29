const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassa = require('../controllers/cassaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , cassa.getAllcassa);
router.get('/' , [authjwt.verifyToken], cassa.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , cassa.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], cassa.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], cassa.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], cassa.delete);

// lettura per data cassa
router.get('/getbycassa/cassa/:datacassa', [authjwt.verifyToken] , cassa.getbydata);    // 

// lettura per data cassa
router.get('/getbycassa/lastdata', [authjwt.verifyToken] , cassa.getlastdata);    // 

module.exports = router;

