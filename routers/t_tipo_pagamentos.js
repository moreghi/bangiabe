const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const tipopagamento = require('../controllers/tipopagamentoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , tipopagamento.getAlltipopagamento);
router.get('/' , [authjwt.verifyToken], tipopagamento.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , tipopagamento.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tipopagamento.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], tipopagamento.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tipopagamento.delete);


module.exports = router;