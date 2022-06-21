// creo i metodi per la gestione dell'utente

// esempio di come codificare il controller
// https://github.com/loizenai/node-js-angular-crud-mysql-example/blob/master/app/controllers/controller.js
// login con jwt
// https://github.com/loizenai/Nodejs-Tutorials/blob/master/Angular%2010%20Nodejs%20JWT%20Token%20Based%20Authentication%20Example%20-%20Backend-Sourcecode/app/controller/controller.js
// gestione user e tabelle varie con jwt
// https://github.com/loizenai/Nodejs-Tutorials/blob/master/Angular%2010%20Nodejs%20JWT%20Token%20Based%20Authentication%20Example%20-%20Backend-Sourcecode/app/router/router.js
// crud con mysql
// https://github.com/loizenai/Nodejs-Tutorials/blob/master/Nodejs-Reactjs-MySQL-CRUD-Example/app/controllers/controller.js
// varie
// https://github.com/loizenai
// altro esempio crud
// https://github.com/AugustoBet4/CRUD_angular_mysql/blob/master/server/src/controllers/gamesController.ts

const config = require("../config.json");
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("generic", salt);

const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');
const { addAbortSignal } = require("stream");
//const { DataTypes } = require("sequelize/dist");   buttare

// modulo per inoltro mail a utente
//const sendgm = require('../services/auth.service');

const expiresToken = 3600;
console.log(`authController_bkend hsh : ---------- ${hash}`);

// 24/11/2021   inseriti jwt per salvare jwt quando faccio login
const User = db.user;
// tabelle correlate
const Truolo = db.truolo;
const Tstatoutente = db.tstatoutente;


const RegConf = db.regConf;
const ForgotPass = db.forgotPass;
const ChangePass = db.changePass;
const PrenConfirm = db.prenotazioneConfirmed;



const { pwdhashed } = '';


const strSql = 'select `users`.*, `t_stato_utentes`.`d_stato_utente`' +
                ' FROM `users` ' + 
                ' JOIN `t_stato_utentes` ON `t_stato_utentes`.`id` = `users`.`idStato` '




/*
module.exports = {
    login,
   // register
};

*/

//  nuova versione l

/*

ModelA.findAll({
    include: [
        {
            model: ModelB,
            on: {
                col1: sequelize.where(sequelize.col("ModelA.col1"), "=", sequelize.col("ModelB.col1")),
                col2: sequelize.where(sequelize.col("ModelA.col2"), "=", sequelize.col("ModelB.col2"))
            },
            attributes: [] // empty array means that no column from ModelB will be returned
        }
    ]
}).then((modelAInstances) => {


      ' JOIN `t_ruolos` ON `t_ruolos`.`id` = `users`.`idRuolo` ' +
                ' JOIN `t_ruolo_days` ON `t_ruolo_days`.`id` = `users`.`idRuolo_Day` ' + 
                ' JOIN `t_ruolo_webs` ON `t_ruolo_webs`.`id` = `users`.`idruoloweb` ' +
                ' JOIN `t_stato_utentes` ON `t_stato_utentes`.`id` = `users`.`idStato` '


*/





/*
   per quando previste le relazioni (Hidran / matteo)
   include : [
        { 
          model: Truolo,
          on: {
            col1: db.sequelize.where(db.sequelize.col("User.idRuolo"), "=", db.sequelize.col("Truolo.id")),
          }, 
          attributes: ['d_ruolo'] //Use Sequelize.Op.col for reference on other column
         },
        { 
          model: Truoloday,
          on: {
            col2: db.sequelize.where(db.sequelize.col("User.idRuolo_Day"), "=", db.sequelize.col("Truoloday.id")),
          }, 
          attributes: ['d_ruolo_day'] //Use Sequelize.Op.col for reference on other column
        },
        { 
          model: Truoloweb,
          on: {
            col3: db.sequelize.where(db.sequelize.col("User.idruoloweb"), "=", db.sequelize.col("Truoloweb.id")),
          }, 
          attributes: ['d_ruolo_web'] //Use Sequelize.Op.col for reference on other column

        },
        { 
          model: Tstatoutente,
          on: {
            col4: db.sequelize.where(db.sequelize.col("User.idStato"), "=", db.sequelize.col("Tstatoutente.id")),
          }, 
          attributes: ['d_stato_utente'] //Use Sequelize.Op.col for reference on other column

        }
      ],

*/

/*
  Attenzione -- funziona     2022/01/10

           include : [
        { 
          model: db.tstatoutente, 
          required: true,
          attributes: ["d_stato_utente"], 
          as: "t_stato_utentes",
          on: {
            col4: db.sequelize.where(db.sequelize.col("Users.idStato"), "=", db.sequelize.col("t_stato_utentes.id")),
          } 
        }, 
      { 
          model: db.truoloweb, 
          required: true,
          attributes: ["d_ruolo_web"],
          as: "t_ruolo_webs", 
          on: {
            col4: db.sequelize.where(db.sequelize.col("Users.idruoloweb"), "=", db.sequelize.col("t_ruolo_webs.id")),
          } 
      },    
      { 
          model: db.truoloday, 
          required: true,
          attributes: ["d_ruolo_day"], 
          as: "t_ruolo_days",
          on: {
            col4: db.sequelize.where(db.sequelize.col("Users.idRuolo_Day"), "=", db.sequelize.col("t_ruolo_days.id")),
          } 
      },   
      { 
          model: db.truolo, 
          required: true,
          attributes: ["d_ruolo"],
          as: "t_ruolos",
          on: {
            col4: db.sequelize.where(db.sequelize.col("Users.idRuolo"), "=", db.sequelize.col("t_ruolos.id")),
          } 
      },   
    ],




*/



/*
 on: {
            col4: db.sequelize.where(db.sequelize.col("User.idStato"), "=", db.sequelize.col("Tstatoutente.id")),
          } 

*/

exports.login = (req, res) => {

  //  console.log('backend ---------------   login  appena entrato ----- email: ' + req.body.email);




    let email = req.body.email;
  
    let strsql = strSql + " where `users`.`email` = '" + email + "' ";

    console.log('backend - login - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all users - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura utente ' + result.length);  

            console.log(`rilevati ${result.length} utenti `)
            const user = result[0];
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
        
              if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
        
              var token1 = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: expiresToken  // 86400 // 24 hours
              });
        
    //  console.log('backend - login --token  originario --------- ' + token1)
      
      
              // moreno 20211203
              
              const data = JSON.stringify(user);
         //     console.log('backend - login ---  data' + data);
              var token = jwt.sign({data}, config.secret, {
                expiresIn: config.expiresIn // 24 hours
              })
        //      console.log('backend - login ----------- ' + token);

              res.status(200).send({
                id: user.id,
                username: user.username,
                cognome: user.cognome,
                level:  user.idLevel,                           //user.level,
                user_ruolo: user.idRuolo,
                email: user.email,
                accessToken: token,
                token_type: 'bearer',
                expires_in: expiresToken,
              
              });
             
        }else {
            console.log('email inesistente ' + result.length); 

            res.status(200).send({ 
                message: `email Inesistente `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

       
        // moreno 20211203 ----  fine

        //  attenzione accessToken deve essere valorizzato co token1






/*  versione login in uso fino al 24/11/2021 
    
exports.login  = (req,res)=> {

//  let email = req.params.email;
  //  let password = req.params.password;
  
  let email = req.body.email;
  let password = req.body.password;

// in alternativa 
//   const {email, password} = req.body;

console.log(`server 3000 - login: parametri passati: ${email} --- password: ${password}`);

    
// controlli se i  campi email e password non sono vuoti
if(email == undefined || email == '' ||
    password == undefined || password == '') {
        res.status(401).json({
            massege:"email o password non valorizzati",
            status:res.status.Code,
            data:null
        })
    }


let strsql = `select * from users where email= '${email}' `;

console.log(`strsql creata: ${strsql}`);


const account =  db.query(strsql,(err,result) => {
    if(err) {

        console.log(err,'errore il login users for email ' + email);
    }
    

   
    console.log(`password da body da fare hash: ${req.body.password}`);

    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(` effettuato hash da body ----> ${hash}`);

    if(result.length>0) {
        console.log(`rilevati ${result.length}  ------------------------   utenti loggati `)
        console.log(`utente loggato-cognome: ${result[0].cognome}`);

        console.log(`utente loggato-password da mysql: ${result[0].password}`);
        console.log(`utente loggato-password hash da body: ${hash}`);

    

        const validPassword =  bcrypt.compare(hash, result.password);
        if (validPassword) {
      //  res.status(200).json({ message: "Valid password" });
                console.log(result);

          //      webToken.cognome = result[0].cognome;
          //      webToken.username = result[0].username;
         //       webToken.email = result[0].email;
         //       webToken.level = result[0].level;
        //        webToken.id = result[0].id;
         //       webToken.idruoloweb = result[0].idruoloweb;



        res.send({
            message: "Valid password - utente  Loggato con successo",
            data:result[0]  // non salvo il record ma il jwt

           // data:webToken
           })
        } else {
          
       // res.status(400).json({ error: "Invalid Password" });   // originale
        res.send({
            message: "Mail Inesistente",
            data:null 

           // data:webToken
           })
       } 

      }
    }


)}   

*/

exports.regconf =  (req,res)=> {
     //   vecchia maniera  - da rifare
    let token =  req.params.token;
    console.log(`backend ------ authController.regconf -  inizio - token passato:  ${token}`);
    
    let strsql = `select * from register_confirmeds where token= '${token}' `;
    
    console.log(`strsql creata: ${strsql}`);
    
    
    const account =  db.query(strsql,(err,result) => {
        if(err) {
              console.log(err,'errore lettura register_confirmeds for token ' + token);
        }
         
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------  conferme registrazione `)
            res.status(200).json({
                massege:"letto richiesta di registrazione",
                status:res.status.Code,
                data:result[0]
            })       
         } else {
            res.status(404).json({
                massege:"inesistente  richiesta di registrazione da mail",
                status:res.status.Code,
                data:null
                })       
            }
         
            });

         }

// conferma richiesta di registrazione e invio mail
//  ----------------------------------------------------------------------------------------   funziona
exports.confirmedregister  = (req,res)=> {

    console.log(`authController.confirmedregister nuova versione - utilizzo middleware -  inizio`);


    

      


     
    
    console.log(`server 3000 - confirmedregister: -- vado a creare register_confirmeds`);
    
    console.log(`email : ${req.body.email} --- password: ${req.body.password} --- username: ${req.body.username} --- cognome: ${req.body.cognome} --- nome: ${req.body.nome}`);   
  


    const tokenn = randomTokenString();


    let customer = {};

    try{
        // Building Customer object from upoading request's body

        customer.username = req.body.username,
        customer.cognome = req.body.cognome,
        customer.nome = req.body.nome,
        customer.email = req.body.email,
        customer.password = req.body.password,
        customer.token = tokenn
   
        // Save to MySQL database
        RegConf.create(customer).then(result => {    
            // send uploading message to client
            console.log('creato record per conferma registrazione');
            send_gmmailfor_register(req.body.email,req.body.cognome,req.body.nome,tokenn);
            res.status(200).json({
                message: "richiesta di accensione per utente " + customer.cognome + " completata con successo",
                RegConf: [result],
                error: ""
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Errore in rgistrazione richiesta nuovo utente!",
            RegConf: [],
            error: error.message
        });
    }
  }
 
exports.confirmedprenotazione  = (req,res)=> {

      console.log(`backend ----- authController.confirmedprenotazione - appena entrato`);

      console.log('parametri Passati : ' + JSON.stringify(req.body));   
     
  
      const codpren =  randomcodprenString();
      const token = randomTokenString();

      console.log(
        `   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);

      let confirmPrenot = {};
  
      try{
          // Building Customer object from upoading request's body

          /* prima versione
          confirmPrenot.cognome = req.body.cognome
          confirmPrenot.nome = req.body.nome
          confirmPrenot.email = req.body.email
          confirmPrenot.telefono = req.body.telefono
          confirmPrenot.datapren = req.body.datapren
          confirmPrenot.persone = req.body.persone
          confirmPrenot.codpren = codpren
          confirmPrenot.token = token

          console.log('confirmPrenot  -----  pronto per inserimento  : ' + JSON.stringify(confirmPrenot));   


         

               // Save to MySQL database
          PrenConfirm.create(confirmPrenot).then(result => {    
              // send uploading message to client
              console.log('creato record per conferma registrazione');
            //  send_gmmailfor_register(req.body.email,req.body.cognome,req.body.nome,tokenn);
              res.status(200).json({
                  message: "richiesta di conferma Prenotazione per cliente " + confirmPrenot.cognome + " completata con successo",
                  PrenConfirm: [result],
                  error: ""
              });
          });

        */

// seconda versione

        let cognome = req.body.cognome;
        let nome = req.body.nome;
        let email = req.body.email;
        let telefono = req.body.telefono;
        let datapren = req.body.datapren;
        let persone = req.body.persone;
        let codpren = req.body.codpren;
        let token = req.body.token;

        let strsql =  `insert into prenotazione_confirmeds
                  (cognome,nome,email,telefono,datapren,persone,codpren,token) 
                  valueS
                  (
                    '${cognome}','${nome}','${email}','${telefono}','${datapren}',${persone},'${codpren}','${token}' 
                  )`;


        db.query(strsql,(err,result) => {
            if(err) { 
              console.log(err,'errore in registrazione conferma Prenotazione su tabella prenotazione_confirmeds ');
              res.status(500).send({
              message: `errore in registrazione conferma Prenotazione su tabella prenotazione_confirmeds - errore: ${err}`,
              data:null
              });
              return;
            }
            console.log(result, `result ...... conferma Prenotazione inserita regolarmente `);
            res.status(200).send({
            message: `persona inserita regolarmente`,
            data:result
            });
        });
      }catch(error){
          res.status(500).json({
              message: "Errore in registrazione richiesta conferma Prenotazione ",
              PrenConfirm: [],
              error: error.message
          });
    }


  /*    metodo originario


 // Save User to Database
 RegConf.create({
  username: req.body.username,
  cognome: req.body.cognome,
  nome: req.body.nome,
  email: req.body.email,
  password: req.body.password,
  token: tokenn
  })
  .then(regConf => {
   console.log('creato record per conferma registrazione');
   send_gmmailfor_register(req.body.email,req.body.cognome,req.body.nome,tokenn);

   res.send({
       message: `Utente inserito regolarmente in register_confirmeds - controlla mail`,
       data: regConf
       });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
   
     */
  
  


  } 
  
  
// ------------------------------------------------------  funziona (problema solo su await in User.update)
exports.confchangePassword = async (req, res) => {

  console.log(`1 authController.confchangePassword nuova versione - utilizzo middleware -  inizio`);
    
  console.log(`2 server 3000 - cambio la password e cancello richiesta di cambio password change_passwords`);
  
  console.log(`3 email : ${req.body.email} --- password: ${req.body.password} `);   


  const hash = bcrypt.hashSync(req.body.password, salt);

  console.log(`3_1 hash : ${hash}  `);   

  const tokenn = randomTokenString();
  console.log(`3_2 token : ${tokenn}  `);   
  
  try{
   
     // let customer = await User.findOne(req.body.email);

     User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Utente inesistente" });
        }
          console.log(`letto user ${user.cognome} `);   
        // update new change to database
          let userId = user.id;
          console.log('letto user - id: ' + userId);
       //   user.password = hash;
       //   user.remember_token = tokenn;
        console.log('pronto per fare update di User');
        let updatedObject = {
          password: hash,
          remember_token: tokenn
        }
          let result = User.update(updatedObject, {returning: true, where: {id: userId}});
           // return the response to client
          if(!result) {
              res.status(500).json({
                  message: "Error -> Can not update a customer with id = " + userId,
                  error: "Can NOT Updated",
                  user: null              });
          }
          console.log(`fatto aggiornamento di User con id: ${userId} `);
// effettuo la cancellazione della richiesta cambio password
          ChangePass.destroy({
            where: {
             email: req.body.email
            }
           }).then(count => {
            if (!count) {
             return res.status(404).send({error: 'No user'});
            }
            res.status(204).json({
              message: `richiesta change password eseguita regolarmente ...   ok per  email: ${req.body.email} --  `,
              rc: 'ok',
              data:[user],
              error: ""
             }) 
           });
        }) 
     .catch(err => {
      res.status(500).send({ message: err.message });
    });

  } catch(error){
    res.status(500).json({
        message: "Error -> Can not update a customer with id = " + req.params.id,
        error: error.message,
        user: null

    });
  }

}

  // --- password dimenticata
  exports.forgotpassword = (req,res) => {
    

    console.log(`forgotpassword ------  email : ${req.body.email} ---  sono a inizio`);   
    // verifico che utente sia effettivo
    ForgotPass.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(forgot => {
        if (!forgot) {
          return res.status(404).send({ message: "email inesistente" });
        }
        res.status(200).send({
          message: `utente letto xxxx `,
          data: forgot
          });
        })
      .catch(err => {
          res.status(500).send({ message: err.message });
        });


  }

 


    
/*
     versione originaria fino al 25/11/2021
exports.confirmedregister  = (req,res)=> {

    console.log(`authController.confirmedregister vecchia versione - utilizzo middleware -  inizio`);




      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      let token = randomTokenString();


     
    
    console.log(`server 3000 - confirmedregister: parametri : ${email} --- password: ${password} --- username: ${username}`);
    
        
    // controlli se i  campi email e password non sono vuoti
    if(email == undefined || email == '' ||
        password == undefined || password == '') {
            res.status(401).json({
                massege:"email o password non valorizzati",
                status:res.status.Code,
                data:null
            })
        }
    
    
    let strsql = `select * from users where email= '${email}' `;
    
    console.log(`strsql creata: ${strsql}`);
    
    
    const account =  db.query(strsql,(err,result) => {
        if(err) {
              console.log(err,'errore il login users for email ' + email);
        }
         
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti loggati `)
            console.log(`email già utilizzata - registrazione non possibile: ${result[0].cognome}`);
    
            res.status(400).json({
                massege:"utente già registrato con questa email",
                status:res.status.Code,
                data:null
            })       
         } else {
  
            let strsql =  `insert into register_confirmeds
            (email,cognome,nome,username,password,token) 
            valueS
            (
               '${email}','${cognome}','${nome}','${username}','${password}','${token}' 
            )`;

            console.log(`strsql per insert : ${strsql}`);


            db.query(strsql,(err,result) => {
            if(err) {
                      console.log(err,'errore in registrazione nuovo utente su tabella register_confirmeds ');
            }
            if(result) {
                console.log(result, `result ...... Utente inserito regolarmente in register_confirmeds `);

                send_gmmailfor_register(email,cognome,nome,token);

                res.send({
                    message: `Utente inserito regolarmente in register_confirmeds`,
                    data: result
                    });
            }
         
            });

         }
    
            
        })  
      
      
      
      
      }




*/

// per visualizzare i dai della richiesta di ripristino password
exports.forgotconf = (req,res)=> {

  let email =  req.params.email;
  console.log(`backend ------ authController.forgotconf -  inizio - email passato:  ${email}`);
  //      originale
/*
 
  
  let strsql = `select * from forgot_passwords where email= '${req.params.email}' `;
  
  console.log(`strsql creata: ${strsql}`);
  
  
  const account =  db.query(strsql,(err,result) => {
      if(err) {
            console.log(err,'errore lettura forgot_passwords for email ' + req.params.email);
      }
       
      if(result.length>0) {
          console.log(`rilevati ${result.length}  ------------------------  conferme registrazione `)
          res.status(200).json({
              massege:"letto richiesta di registrazione",
              status:res.status.Code,
              data:result[0]
          })       
       } else {
          res.status(404).json({
              massege:"inesistente  richiesta di ripristino password da mail",
              status:res.status.Code,
              data:null
              })       
          }
       
          });
*/


  //    sembra che non funzioni più
  // const test = 'ghisellini.moreno@gmail.com';
  ForgotPass.findOne({
    where: {
      email: req.params.email
    }
  })
  .then(forgotPass => {
    if (forgotPass) {
      res.status(200).send({
        message: `utente letto su forgot_passwords `,
        data: forgotPass
        });
      
    } else {
      return res.status(404).send({ message: "richiesta di Ripristino email inesistente !!!!" });
    }
    
    })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });



    


/*

  let strsql = `select * from register_confirmeds where token= '${token}' `;
  
  console.log(`strsql creata: ${strsql}`);
  
  
  const account =  db.query(strsql,(err,result) => {
      if(err) {
            console.log(err,'errore lettura register_confirmeds for token ' + token);
      }
       
      if(result.length>0) {
          console.log(`rilevati ${result.length}  ------------------------  conferme registrazione `)
          res.status(200).json({
              massege:"letto richiesta di registrazione",
              status:res.status.Code,
              data:result[0]
          })       
       } else {
          res.status(404).json({
              massege:"inesistente  richiesta di registrazione da mail",
              status:res.status.Code,
              data:null
              })       
          }
       
          });


          */
}

  // creazione nuvo users dopo conferma da mail ricevuta
  exports.createUserbyRegister = async (req,res)=> {

    console.log(`authController.createUserbyRegister -  inizio`);
     
     // let cognome = req.body.cognome;
    //  let nome = req.body.nome;
    //  let username = req.body.username;
    //  let email = req.body.email;
    //  let password = req.body.password;
    //  let token = randomTokenString();

  
    console.log(`server 3000 - createUserbyRegister: parametri : ${req.body.email} --- password: ${req.body.password} --- username: ${req.body.username}`);
    
    console.log(`password da body da fare hash: ${req.body.password}`);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(` effettuato hash da body ----> ${hash}`);

    let customer = {};

    try{
        // Building Customer object from upoading request's body

        customer.username = req.body.username,
        customer.cognome = req.body.cognome,
        customer.nome = req.body.nome,
        customer.email = req.body.email,
        customer.password = hash,
        customer.remember_token = randomTokenString();
     
        console.log(` inizializzato costumer ----> ${customer}`);
        // Save to MySQL database

       

        let user = await User.create(customer).then(result => { 
          if(user) {
            console.log('eseguito creazione user');
            //   let regConf = await RegConf.findByPk(req.body.email);    // originale che crea problema
            let regConf = RegConf.findByPk(req.body.email);
            if(!regConf){
                res.status(404).json({
                message: "inesistente richiesta registrazione utente per email = " + req.body.email,
                error: "404",
                regconf: []
                });
            } else {
  
                RegConf.destroy(req.body.email);
                console.log('creato record User correttamente');
                console.log('cancellazione su register_confirmeds effettuata correttamente');
                res.status(200).json({
                  message: "utente " + customer.cognome + " creato correttamente",
             //     User: [result],
                  error: ""
                });
            }

          } else {
            res.status(404).json({
              message: "errore in creazione utentexxxx con email = " + req.body.email,
              user: [],
              error: "404"
          });
          }
         

        })

      } 
     catch(error){
      res.status(500).json({
          message: "Errore un registrazione nuovo utenteeeee  " + customer.cognome,
          error: error.message,
          customers: []

      });
    }
   
  }     

  function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function randomcodprenString() {
  return crypto.randomBytes(5).toString('hex');
}


//  metodo creato da moreno per inoltro mail in fase di registrazione nuovo utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_register(sendto,cognome,nome, token) {
let message;

    const confURL = `http://localhost:4200/signupConferme?token=${token}`;
    message = `<p>Buongiorno sig ${cognome} ${nome}</p>
                <p>abbiamo ricevuto la richiesta di nuova registrazione utente</p>
                <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la registrazione</p>
               <p><a href="${confURL}"><button>Conferma Registrazione</button></a></p>`;

               await sendEmail({
                to: sendto,
                subject: 'Sign-up Conferma Registrazione nuovo Utente',
                html: `<h4>Registrazione nuovo utente - Moreno</h4>
                       ${message}`
            });
}






/*   metodi di test  */

exports.confirmedprenotazioneaaaa = (req,res)=> {
  console.log('merdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  console.log(`parametri Passati : ${req.body} `);  
}
exports.resetpwduser = (req,res) => {

  console.log(`authController.resetpwduser -  inizio`);
  console.log(`email : ${req.body.email} --- password: ${req.body.password} `);   

}



/*


        let customer = await User.create(customer)
       
        if(!customer){
          // return a response to client
          console.log('errore in creazzione utente');
          res.status(500).json({
           message: `errore in creazione utente ${customer.cognome} `,
           customers: null                     
         });
      } else {  
        
        let regconf = await RegConf.destroy();
        if(regconf) {
          console.log('creato record User correttamente');
          console.log('cancellazione su register_confirmeds effettuata correttamente');
          res.status(200).json({
            message: "utente " + customer.cognome + " creato correttamente",
            User: [customer],
            error: ""
          });
        } else {
          console.log('cancellazione su register_confirmeds non eseguita');
          res.status(500).json({
            message: "cancellazione su register_confirmeds per utente " + customer.cognome + " non eseguita",
            regconf: null                     
          });
        }
     }

*/



       
       
       
       
       /*  nuovo
        if(ret) {
              console.log('creato utenteeeeeeeeeeeeeeee ');
              let resp = await ForgotPass.findByPk(email);

              if(!resp) {
                  res.status(404).json({
                      message: "inesistente richiesta prenotazione per email = " + email,
                      error: "404",
                      resp: []
                      });
                  } else {
                      let aa = await resp.destroy();
                      if(aa) {
                        console.log('creato record User correttamente');
                        console.log('cancellazione su register_confirmeds effettuata correttamente');
                        res.status(200).json({
                          message: "utente " + customer.cognome + " creato correttamente",
                          User: [ret],
                          error: ""
                        });
                      } else {
                        console.log('cancellazione su register_confirmeds non eseguita');
                        res.status(500).json({
                          message: "cancellazione su register_confirmeds per utente " + customer.cognome + " non eseguita",
                          resp: null                     
                        });
                      }
                   }
                 
          } else {
             console.log('errore in creazzione utente');
             res.status(500).json({
              message: `errore in creazione utente ${customer.cognome} `,
              ret: null                     
            });
        }
        }catch(error){
            res.status(500).json({
                message: "Errore in rgistrazione richiesta nuovo utente!",
                RegConf: [],
                error: error.message
            });
         }
       */

  



    // -------------------------     
    /* -------------------------------------   vecchia versione da cancellare
    let strsql = `select * from users where email= '${email}' `;
    
    console.log(`strsql creata: ${strsql}`);
    
    
    const account =  db.query(strsql,(err,result) => {
        if(err) {
              console.log(err,'errore il login users for email ' + email);
        }
         
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti loggati `)
            console.log(`email già utilizzata - registrazione non possibile: ${result[0].cognome}`);
    
            res.status(400).json({
                massege:"utente già registrato con questa email",
                status:res.status.Code,
                data:null
            })       
         } else {
          
      //    insertUser(email,cognome,nome,username,hash,token);    da cancellare  (nn serve più)
            deleteConfRegister(email);
            return res.send({
                message: `Utente inserito regolarmente in users`,
                data: result
                });
             }
        });
      */

 

//  function varie

/*
async function deleteConfRegister(req,res,email) {

  try{
  
    let customer = await ForgotPass.findByPk(email);

    if(!customer){
        res.status(404).json({
            message: "inesistente richiesta prenotazione per email = " + email,
            error: "404",
            customers: []
        });
    } else {
        await customer.destroy();
        console.log('cancellazione su register_confirmeds effettuata correttamente');
     
        res.status(200).json({
            message: "Cancellata correttamente richiesta prenotazioneper email = " + email,
            customers: [customer],
            error: ""
        });
       
    }
} catch(error) {
    res.status(500).json({
        message: "Error -> Can NOT delete a customer with email = " + email,
        error: error.message,
        customers: []
    });
}
  
/*          vecchio modo
    let strsql =  `delete from register_confirmeds WHERE email= '${email}' `;
    console.log(`strsql per delete : ${strsql}`);

    let rc = await db.query(strsql,(err,result) => {
    if(err) {
              console.log(err,`errore in cancellazione conferma registrazione nuovo utente per email ${email} `);
    }
    if(result) {
        
        console.log('evviva !!!! effettuata la cancellazione richiesta registrazione  su tabella register_confirmeds ');
        return result[0]
      }
    });

    

    */

 
/*   metodo che non serve più 
async function insertUser(email,cognome,nome,username,hash,token) {

     
    let strsql =  `insert into users
                    (email,cognome,nome,username,password,remember_token) 
                    valueS
                    (
                    '${email}','${cognome}','${nome}','${username}','${hash}','${token}' 
                    )`;

    console.log(`strsql per insert : ${strsql}`);
    let rc = await db.query(strsql,(err,result) => {
            if(err) {
                    console.log(err,'errore in registrazione nuovo utente su tabella users ');
            }
            if(result) {
                console.log('evviva !!!! effettuata la registrazione nuovo utente su tabella users ');
              
            }
        });

      
}
*/





 /*    metodo spostato in forgotPasswordController
 //  metodo creato da moreno per inoltro mail in fase di ripristino Password
 async function send_gmmailfor_forgotPassword(sendto,cognome,nome) {
  let message;

      const confURL = `http://localhost:4200/forgotpasswordConferme?email=${sendto}`;
      message = `<p>Buongiorno sig ${cognome} ${nome}</p>
                  <p>abbiamo ricevuto la richiesta di ripristinare la sua passowrd</p>
                  <p>ti preghiamo di cliccare sul link sottostante per rendere operativo il ripristino</p>
                 <p><a href="${confURL}"><button>Conferma Ripristino</button></a></p>`;
  
                 await sendEmail({
                  to: sendto,
                  subject: 'Ripristina Password',
                  html: `<h4>Ripristina Password Utente</h4>
                         ${message}`
              });
  }
*/

/*
const authController =  new AuthController();
export default authController;
*/