const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const logsettore = require('../controllers/logsettoreController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , logsettore.getAlllogsettore);
router.get('/:idlog/settore' , [authjwt.verifyToken], logsettore.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , logsettore.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], logsettore.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], logsettore.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], logsettore.delete);

// lettura per logistica-Settore
router.get('/getbySettore/:idlog/:idsettore' , [authjwt.verifyToken], logsettore.getbySettore);
// lettura per logistica-Settori attivi
router.get('/getbySettoreAct/:idlog/:stato' , [authjwt.verifyToken], logsettore.getbySettoreAct);


module.exports = router;