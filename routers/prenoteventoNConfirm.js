const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotazeventonormal = require('../controllers/PrenotazeventonormalConfirmedController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le prenotazioni
router.get('/'  , prenotazeventonormal.getAll);

// lettura singola prenotazione
router.get('/:email'  , prenotazeventonormal.getbyemail);

// creazione nuova persona
router.post('/create', prenotazeventonormal.createNew);
// aggiornamento persona  
router.put('/updatebyemail/:email' , prenotazeventonormal.updateByemail);
// aggiornamento utente  
router.put('/updatebyid/:id' , prenotazeventonormal.updateByid);
// cancellazione email
router.delete('/deletebyemail/:email' , prenotazeventonormal.delete);
// cancellazione by id
router.delete('/deletebyid/:id' , prenotazeventonormal.deletebyid);

// ricerca per token  --  OK  --
router.get('/getbytoken/:token', prenotazeventonormal.getbytoken);
// ---
router.get('/getbytokencodpre/:token/:codpren' , prenotazeventonormal.getbytokencodpre);

// ricerca per email e data prenotazione  --
router.get('/getbyemaildatapre/:email/:datapre' , prenotazeventonormal.getbyemaildatapre);

// cancellazione token  --
router.delete('/destroyToken/:token' , prenotazeventonormal.destroyToken);

// lettura singola prenotazione  --
router.get('/getbyemail/:email'  , prenotazeventonormal.getbyemail);

// lettura singola prenotazione per utente e mail --
router.get('/getbyemailuser/:email/:cognome/:nome/:persone'  , prenotazeventonormal.getbyemailUtente);
// registrazione delle richiesta posti per evento SENZA LOGISTICA
router.post('/confirmedeventoN', prenotazeventonormal.confirmedprenotazione); 
// registrazione delle richiesta postp per evento con Logistica
router.post('/confirmedeventoL', prenotazeventonormal.confirmedprenotazionelogistica); 

// invio email per conferma di gruppo a registrazioni singole
router.get('/getbyconfirmedpren/sendmail/:email/:cognome/:nome/:keyuserpren/:devento/:dataev', prenotazeventonormal.invioemailconfirmedprenotazionelogistica); 


module.exports = router;
    


