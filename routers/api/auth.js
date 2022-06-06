const express = require('express');
//const { default: authController } = require('../../controllers/AuthController');
const router = express.Router();

// controlli preventivi su login/signup


const verifySignUp = require('../../middleware/verifySignUp');
const verifyEmail = require('../../middleware/verifyEmail');



const auth = require('../../controllers/AuthController');


// login con email + password
// router.post('/login', auth.login);
router.post('/login', auth.login);
// router.post('/confirmedregister', auth.confirmedregister);     originale

router.post('/confirmedprenotazione', auth.confirmedprenotazione);    


router.post(
    "/confirmedregister",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      
    ],
    auth.confirmedregister
  );

  router.post(
    "/confchangePassword",
    [
      verifySignUp.checkEmailandpassword,
      
    ],
    auth.confchangePassword
  );



  // per inviare mail a utente - creo record forgot_passwords
  router.post(
    "/forgotpassword",
    [
      verifyEmail.checkEmail,
      
    ],
    auth.forgotpassword
  );


  


router.get('/regconf/:token', auth.regconf);

// crea user da register_confirmeds e elimino richiesta
router.post(
  "/createUserbyRegister",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    
  ],
  auth.createUserbyRegister
);



router.get('/forgotconf/:email', auth.forgotconf);    // ok


router.post('/confforgotpassword', auth.resetpwduser);    





module.exports = router;