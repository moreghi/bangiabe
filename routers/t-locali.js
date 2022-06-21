const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const localita = require('../controllers/localitaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , localita.getAlllocalita);
router.get('/' , localita.getAll);
// lettura singolo utente
router.get('/:id' , localita.getbyid);    // , [authjwt.verifyToken]
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], localita.createNew);   // , [authjwt.verifyToken]
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], localita.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], localita.delete);
// per descrizione localita
router.get('/getbydlocalita/:local' , localita.getbydlocalita);

// ricerca per lastId    
router.get('/localitalast/lastid',  localita.getLastLocalitaid);



module.exports = router;