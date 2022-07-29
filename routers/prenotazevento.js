const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotazeventos = require('../controllers/prenotazeventoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prenotazeventos.getAll);

// lettura singolo utente
router.get('/:id'  , prenotazeventos.getbyid);

// creazione nuova persona
router.post('/create' , prenotazeventos.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotazeventos.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id' , prenotazeventos.delete);
// ricerca prenotazioni da evadere
router.get('/pren/getPrenotazinidaEvadere' , prenotazeventos.getPrenotazinidaEvadere);
// ricerca prenotazione da evadere
router.get('/pren/prenotazionibyevento/:idevento', prenotazeventos.getPrenotazinidaEvaderebyevento);
// ricerca prenotazione per stato  // ok
router.get('/pren/getPrenotazinibystato/:stato'  , prenotazeventos.getPrenotazinibystato);
// ricerca prenotazione per email
router.get('/pren/getPrenotazionibyemail/:email'  , prenotazeventos.getPrenotazionibyemail);

// invio email dopo conferma prenotazione
router.post('/pren/invioemailprenotazione/:email' , prenotazeventos.sendmailprenconfirmed);    //

// ricerca prenotazione per evento
router.get('/pren/getbyevento/evento/:idevento', prenotazeventos.getPrenotazinibyevento);

module.exports = router;

