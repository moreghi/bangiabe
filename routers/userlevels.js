const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const userlevels = require('../controllers/UserlevelsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti i profili
router.get('/', [authjwt.verifyToken] , userlevels.getAlls);
// creazione nuovo profilo
router.post('/create', [authjwt.verifyToken], userlevels.createNew);
// cancellazione profilo
router.delete('/deletebyid/:id', [authjwt.verifyToken], userlevels.delete);
// aggiornamento profilo  
router.put('/updatebyid/:id', [authjwt.verifyToken], userlevels.updateByid);
// lettura singolo profilo
router.get('/:id', [authjwt.verifyToken] , userlevels.getbyid);

module.exports = router;