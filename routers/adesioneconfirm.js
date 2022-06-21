const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const adeConf = require('../controllers/adesioneConfController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , adeConf.getAlladeConf);
router.get('/' , adeConf.getAll);
// lettura singolo utente
router.get('/:id' , adeConf.getbyid);    // 
// creazione nuovo utente
router.post('/create', adeConf.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', adeConf.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', adeConf.delete);

// ricerca per token
router.get('/getbytoken/:token' , adeConf.getbytoken);

// ricerca per token e codic eadesione
router.get('/getbytokencodade/:token/:codade', adeConf.getbytokencodade);

// ricerca per email
router.get('/getbyemail/:email' , adeConf.getbyemail);

// ricerca per email-cognome-nome
router.get('/getbyemailCognomeNome/:email/:cognome/:nome' , adeConf.getbyemailCognomeNome);

// cancellazione adesione per token
router.delete('/destroyToken/:token', adeConf.destroyToken);

// registrazione richiesta di adesione con invio email
router.post('/confirmed', adeConf.confirmedadesione); 


module.exports = router;

