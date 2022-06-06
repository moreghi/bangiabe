const db = require('../db');

const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

    console.log('checkDuplicateUsernameOrEmail - inizio');
  // Username
  
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then (user => {
    if (user) {
      res.status(400).send({
        message: "Errore! Username già utilizzata - Inserimento non possibile"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Errore! email già utilizzata - Inserimento non possibile"
        });
        return;
      }

      next();
    });
  });
};

checkEmailandpassword = (req, res, next) => {

  console.log('checkEmailandpassword - inizio');

  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      res.status(400).send({
        message: "Errore! email inesistente - cambio password non possibile"
      });
      return;
    }

    next();
  });

};






console.log('checkDuplicateUsernameOrEmail - fine - controlli ok');

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkEmailandpassword: checkEmailandpassword
};

module.exports = verifySignUp;