const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const logfilaposti = require('../controllers/logfilapostiController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , logfilaposti.getAlllogfilaposti);
router.get('/:idlog' , [authjwt.verifyToken], logfilaposti.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , logfilaposti.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], logfilaposti.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], logfilaposti.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], logfilaposti.delete);

// lettura per logistica/settore/fila
router.get('/getbySettFila/:idlog/:idsett/:idfila' , [authjwt.verifyToken], logfilaposti.getbySettFila);
// lettura per logistica/settore
router.get('/getbySett/:idlog/:idsett' , [authjwt.verifyToken], logfilaposti.getbySett);

module.exports = router;