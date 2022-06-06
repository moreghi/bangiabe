

const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const tesseramento = require('../controllers/tesseramentoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , tesseramento.getAlltesseramento);
router.get('/' , tesseramento.getAll);
// lettura tutti gli utenti
router.get('/getbyidTessera/:tessera', [authjwt.verifyToken] , tesseramento.getbyTessera);
// lettura per socio
router.get('/getbyidSocio/:socio', tesseramento.getbySocio);  // , [authjwt.verifyToken] 
// lettura per socio
router.get('/getbyAnno/:anno/Socio/:socio', tesseramento.getbyAnnoeSocio);  // , [authjwt.verifyToken] 
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , tesseramento.getbyid);
// creazione nuovo utente
router.post('/create', tesseramento.createNew);    // , [authjwt.verifyToken]
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], tesseramento.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tesseramento.delete);


module.exports = router;
