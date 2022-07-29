const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotazeventomasters = require('../controllers/prenotazeventomasterConfirmController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prenotazeventomasters.getAll);

// lettura singolo utente
router.get('/:id'  , prenotazeventomasters.getbyid);

// creazione nuova persona
router.post('/create' , prenotazeventomasters.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotazeventomasters.updateByid);
// cancellazione by id
router.delete('/deletebyid/:id' , prenotazeventomasters.delete);

// ---   ok
router.get('/getbytokencodpre/:token/:codpren' , prenotazeventomasters.getbytokencodpre);

// ricerca per email e data prenotazione  --  ok
router.get('/getbyemaildatapre/:email/:datapre' , prenotazeventomasters.getbyemaildatapre);
// lettura singola prenotazione  --
router.get('/getbyemail/:email'  , prenotazeventomasters.getbyemail);



// ricerca prenotazioni da evadere
router.get('/getPrenotazbycodpren/codpren/:codpren' , prenotazeventomasters.getPrenotazbycodpren);

// cancellazione by codpren
router.delete('/destroycodpren/:codpren' , prenotazeventomasters.destroycodpren);

// cancellazione by token
router.delete('/destroytoken/:token' , prenotazeventomasters.destroytoken);




module.exports = router;

