const db = require('../db');

const User = db.user;

checkEmail = (req, res, next) => {

    console.log('checkEmail - inizio');

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        res.status(400).send({
          message: "Errore! email inesistente - ripristino non possibile"
        });
        return;
      }

      next();
  
  });
};


const verifyEmail = {
  checkEmail: checkEmail,
 
};

module.exports = verifyEmail;