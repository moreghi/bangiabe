const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const bandieragialla = require('../controllers/bandieragiallaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , bandieragialla.getAllbandieragialla);
router.get('/' , bandieragialla.getAll);
// lettura singolo utente
router.get('/:id' , bandieragialla.getbyid);    // , [authjwt.verifyToken]
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], bandieragialla.createNew);
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], bandieragialla.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], bandieragialla.delete);

module.exports = router;