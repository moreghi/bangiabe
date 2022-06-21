const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const quotetessere = require('../controllers/quotatesseraController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tuttle quote
// router.get('/', [authjwt.verifyToken] , quotetessere.getAllquotetessere);
router.get('/' , [authjwt.verifyToken], quotetessere.getAll);
// lettura singola quota
router.get('/:id', [authjwt.verifyToken] , quotetessere.getbyid);    // 
// creazione nuova quota
router.post('/create', [authjwt.verifyToken], quotetessere.createNew);    // 
// aggiornamento quota  
router.put('/updatebyid/:id', [authjwt.verifyToken], quotetessere.updateByid);
// cancellazione quota
router.delete('/deletebyid/:id', [authjwt.verifyToken], quotetessere.delete);


// lettura quota annuale
router.get('/anno/:idbg/:anno', [authjwt.verifyToken] , quotetessere.getbyanno);    // 



module.exports = router;