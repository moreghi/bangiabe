const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const logisticas = require('../controllers/logisticasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], logisticas.getAll);
//           router.get('/' , users.getAllUsers);

// lettura singolo utente
router.get('/:id'  , logisticas.getbyid);

router.get('/getbystato/:stato' , logisticas.getbystato);   // , [authjwt.verifyToken]

// creazione nuovo utente
router.post('/create',  logisticas.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , logisticas.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , logisticas.delete);

// verifica se presenti eventi attivi
router.get('/getbyActive/Act', [authjwt.verifyToken] , logisticas.getAllActive);    // 

module.exports = router;