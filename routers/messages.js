const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const messages = require('../controllers/messagesController');


// lettura abilitazioni singolo utente
// router.get('/:id', [authjwt.verifyToken] , users.getUserbyid);
router.get('/', [authjwt.verifyToken], messages.getAlls);

// lettura utente per email
// router.get('/:id/edit', [authjwt.verifyToken], users.getUserbyemail);
router.get('/:id', messages.getbyid);  // , [authjwt.verifyToken]

// creazione nuovo utente
router.post('/create', messages.createNew);   // , [authjwt.verifyToken]
// aggiornamento utente  
router.put('/updatebyid/:id', messages.updateByid);  // , [authjwt.verifyToken]  
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], messages.delete);


module.exports = router;