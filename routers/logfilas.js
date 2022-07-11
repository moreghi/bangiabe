const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const logfila = require('../controllers/logfilaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , logfila.getAlllogfila);
router.get('/:idlog/:idsett/fila' , [authjwt.verifyToken], logfila.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , logfila.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], logfila.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], logfila.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], logfila.delete);

// lettura per logistica-fila
router.get('/getbyFila/:idlog/:idfila' , [authjwt.verifyToken], logfila.getbyFila);

module.exports = router;