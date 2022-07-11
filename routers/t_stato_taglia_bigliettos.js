// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');  
const tstatotaglia = require('../controllers/tstatotagliabigliettosController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})



// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], tstatotaglia.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], tstatotaglia.getbyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], tstatotaglia.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], tstatotaglia.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], tstatotaglia.delete);



module.exports = router;