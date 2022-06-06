const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const users = require('../controllers/UsersController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , users.getAllUsers);
   router.get('/' , users.getAllUsers);

// lettura tutti gli utenti per ruolo nel circolo
router.get('/getAllbyruolo/:ruolo', [authjwt.verifyToken], users.getAllusersbyruolo);

// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , users.getUserbyid);

// lettura utente per email
router.get('/getbyemail/:email', [authjwt.verifyToken], users.getUserbyemail);
// lettura utente per email
router.get('/getbyemailPren/:email', users.getUserbyemail);

// lettura utente per livello
router.get('/getbylevel/:level', [authjwt.verifyToken], users.getUserbylevel);

// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], users.createNewUser);
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], users.updateUserByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], users.deleteUser);

// lettura tutti gli utenti per tipo (sanfra /guest)
router.get('/getbytipo/:idruolo', [authjwt.verifyToken], users.getUserbytipo);

// lettura utente per email
router.get('/getbyemailecognome/:email/:cognome', [authjwt.verifyToken], users.getUserbyemailecognome);

// lettura utente per email
router.get('/getbyemailecognomePren/:email/:cognome', users.getUserbyemailecognome);

// creazione nuovo utente
router.post('/confirmeduser', users.confirmeduser);


module.exports = router;