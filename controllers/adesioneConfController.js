const strSql = 'select `adesione_confirmeds`.* ' +
                ' FROM `adesione_confirmeds` ' 

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const saltRounds = 10;
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);
const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');


// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from adesione_confirmeds';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all adesione_confirmeds - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte associaoni ' + result.length);  

            console.log(`rilevati ${result.length} associazioni `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun socio pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo socio
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `adesione_confirmeds`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from adesione_confirmeds where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura adesione_confirmeds for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura adesione_confirmeds for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale per associazione id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun socio presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo socio   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo socio');  // visualizzo la struttura dei campi immessi dall'socio 
  
      // creo le variabili dai campi di input

   
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let sesso = req.body.sesso;
      let luogonascita = req.body.luogonascita;
      let datanascita = req.body.datanascita;
      let residenza = req.body.residenza;
      let indirizzo = req.body.indirizzo;
      let email = req.body.email;
      let telcasa = req.body.telcasa;
      let cell = req.body.cell;
      let token = req.body.token;        
      let codade = req.body.codade; 
      let key_utenti_operation = req.body.key_utenti_operation;
  
      let strsql =  `insert into adesione_confirmeds
                  (cognome,nome,sesso, luogonascita,datanascita,residenza,indirizzo,email,telcasa,cell,token,codade,key_utenti_operation) 
                  valueS
                  (
                    '${cognome}','${nome}','${sesso}','${luogonascita}','${datanascita}','${residenza}','${indirizzo}','${email}','${telcasa}','${cell}','${token}','${codade}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova richiesta adesione su tabella adesione_confirmeds ');
              res.status(500).send({
                message: `errore in registrazione nuova richiesta adesione su tabella adesione_confirmeds - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... richiesta adesione inserita regolarmente `);
          res.status(200).send({
            message: `richiesta adesione inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento socio   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica associazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from adesione_confirmeds where id= ${id} `;

    // definisco le variabili per aggiornamento campi

      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let sesso = req.body.sesso;
      let luogonascita = req.body.luogonascita;
      let datanascita = req.body.datanascita;
      let residenza = req.body.residenza;
      let indirizzo = req.body.indirizzo;
      let email = req.body.email;
      let telcasa = req.body.telcasa;
      let cell = req.body.cell;
      let token = req.body.token;        
      let codade = req.body.codade; 
      let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update adesione_confirmeds set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    sesso = '${sesso}',
                    luogonascita = '${luogonascita}',
                    datanascita = '${datanascita}',
                    residenza = '${residenza}',
                    indirizzo = '${indirizzo}',
                    email = '${email}',
                    telcasa = '${telcasa}',
                    cell = '${cell}',
                    token = '${token}',
                    codade = '${codade}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura adesione_confirmeds for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura adesione_confirmeds for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento richiesta adesione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto richiesta adesione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata richiesta adesione id: ${id}`);
                    res.status(200).send({ 
                        message: `richiesta adesione aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente richiesta adesioneid: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna ricchiesta adesione presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento socio   // metodo 1  -- funziona

exports.updatesocioByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica socio id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

  // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from adesione_confirmeds where id= ${id} `;
    
    // definisco 
   let socionew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            socioname: req.body.socioname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notesocio: req.body.notesocio,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura adesione_confirmeds for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura adesione_confirmeds for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE adesione_confirmeds SET ? WHERE id = ' + req.params.id, socionew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto socio ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `socio aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente socio id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun socio pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione socio

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione associazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from adesione_confirmeds where id= ${id} `;

    let strsql =  `delete from adesione_confirmeds  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura adesione_confirmeds for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione associazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `associazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente associazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna associazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// lettura per token
exports.getbytoken = (req,res)=> {
    
    let token = req.params.token;
    
    const strsql = strSql + " where `adesione_confirmeds`.`token` = '" + token + "' ";

    console.log('backend - getbytoken - strsql --> ' + strsql);
  
   // let strsql = `select * from adesione_confirmeds where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura adesione_confirmeds for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura adesione_confirmeds for token ${token}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale richiesta adesione per token: .....  ${token}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} `);
            res.status(200).send({
                message: `nessun socio presente for token: ${token}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura per token e codice adesione
exports.getbytokencodade = (req,res)=> {
    
    let token = req.params.token;
    let codade = req.params.codade;
    
    const strsql = strSql + " where `adesione_confirmeds`.`token` = '" + token + "'  and  `adesione_confirmeds`.`codade` = '" + codade + "'  ";

    console.log('backend - getbytokencodade - strsql --> ' + strsql);
  
   // let strsql = `select * from adesione_confirmeds where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura adesione_confirmeds for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura adesione_confirmeds for token ${token} e for codade ${codade}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale richiesta adesione per token: .....  ${token}   e for codade ${codade}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token}  e for codade ${codade}`);
            res.status(200).send({
                message: `nessuna richiesta adesione presente for token: ${token}  e for codade ${codade}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura per email
exports.getbyemail = (req,res)=> {
    
    let email = req.params.email;
    
    const strsql = strSql + " where `adesione_confirmeds`.`email` = '" + email + "' ";

    console.log('backend - getbyemail - strsql --> ' + strsql);
  
   // let strsql = `select * from adesione_confirmeds where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura adesione_confirmeds for email ' + email);

            res.status(500).send({
                message: `2 errore il lettura adesione_confirmeds for email ${email}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale richiesta adesione per email .... ${email}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email ${email} `);
            res.status(200).send({
                message: `nessun socio presente for email ${email}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura per email e cognome  e nome
exports.getbyemailCognomeNome = (req,res)=> {
    
    let email = req.params.email;
    let cognome = req.params.cognome;
    let nome = req.params.nome;

    const strsql = strSql + " where `adesione_confirmeds`.`email` = '" + email + "'  and  `adesione_confirmeds`.`cognome` = '" + cognome + "' and  `adesione_confirmeds`.`nome` = '" + nome + "' ";

    console.log('backend - getbyemailCognomeNome - strsql --> ' + strsql);
  
   // let strsql = `select * from adesione_confirmeds where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura adesione_confirmeds for email ' + email + ' cognome ' + cognome + ' e nome ' + nome);

            res.status(500).send({
                message: `2 errore il lettura adesione_confirmeds for email ${email} e for cognome ${cognome}  e for nome ${nome} - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale richiesta adesione per email: .....  ${email}   e for cognome ${cognome}  e for nome ${nome}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} e for cognome ${cognome}  e for nome ${nome}`);
            res.status(200).send({
                message: `nessuna richiesta adesione presente for email: ${email} e for cognome ${cognome}  e for nome ${nome}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// cancellazione richiesta adesione per token
exports.destroyToken = (req,res)=> {  

    let token = req.params.token;

    console.log(req.body,`cancellazione associazione token ${token}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from adesione_confirmeds where token= '${token}' `;

    let strsql =  `delete from adesione_confirmeds  where token= '${token}'`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura adesione_confirmeds for token ${token} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione richiesta adesione token ${token}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione richiesta adesione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `richiesta adesione  token ${token} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente richiesta adesione per  token ${token} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna richiesta adesione presente for token ${token}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.confirmedadesione  = (req,res)=> {

    console.log(`backend --  su adesioneConfController--- confirmedadesione - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   

    const codadex =  randomcodadeString();
    const token = randomTokenString();

    console.log(
      `   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);

    

    try{
        // Building Customer object from upoading request's body

        /* prima versione

        let confirmPrenot = {};
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
      let sesso = req.body.sesso;
      let luogonascita = req.body.luogonascita;
      let datanascita = req.body.datanascita;
      let residenza = req.body.residenza;
      let indirizzo = req.body.indirizzo;
      let email = req.body.email;
      let telcasa = req.body.telcasa;
      let cell = req.body.cell;
      let operativo = req.body.operativo;
      let codade = codadex.substring(0, 5);
       

      let strsql =  `insert into adesione_confirmeds
                (cognome,nome,sesso,luogonascita,datanascita,residenza,indirizzo,email,telcasa,cell,operativo,codade,token) 
                valueS
                (
                  '${cognome}','${nome}','${sesso}','${luogonascita}','${datanascita}','${residenza}','${indirizzo}','${email}','${telcasa}','${cell}','${operativo}','${codade}','${token}' 
                )`;

        console.log('--- strsql pronta per fare insert:  ' + strsql );        

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in registrazione conferma richiesta adesione su tabella adesione_confirmeds ');
            res.status(500).send({
            message: `errore in registrazione conferma richiesta adesione su tabella adesione_confirmeds - errore: ${err}`,
            rc: 'ko',
            data:null
            });
            return;
          }
          send_gmmailfor_adesione(req.body.email,req.body.cognome,req.body.nome,token,codade);
          console.log(result, `result ...... conferma Richiesta Adesione inserita regolarmente `);
          res.status(200).send({
          message: `richiesta adesione inserita regolarmente - Controllare email per conferma`,
          rc: 'ok',
          data:result
          });
      });
    }catch(error){
        res.status(500).json({
            message: "Errore in registrazione richiesta conferma adesione ",
           // PrenConfirm: [],
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



//  metodo creato da moreno per inoltro mail in fase di registrazione nuovo utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_adesione(sendto,cognome,nome, token, codade) {
    let message;
    
        const confURL = `http://localhost:4200/adesioneConferma?token=${token}`;
        message = `<p>Buongiorno sig <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>abbiamo ricevuto la richiesta di adesione a Bandiera Gialla.</p>
                    <br>
                    <p>ti ringraziamo per condividere con noi lo spirito di Bandiera Gialla.</p>
                    <br>
                    <p>per garantire la massima sicurezza, ti preghiamo di inserire il codice qui sotto riportato</p>
                    <br>
                    <p>          Codice personale di Adesione &nbsp;&nbsp;&nbsp; <strong>${codade}</strong></p>
                    <br>
                    <p>Saremo felice di accoglierti e di condividere con noi lo stare assieme</p>
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la tua richiesta</p>
                    <br>
                    <br>

                    <p>La tua richiesta sarà resa operativa procedendo al versamento della quota annuale.</p>
                    <p>Ti preghiamo pertanto di voler cortesemente passare presso la sede operativa di </p>
                    <p>via ....  presso la quale potrai versare l importo di € .........</p>
                    <br>
                    <p>In alternativa puoi effettuare un bonifico di € .... </p>
                    <p>utilizzando IBAN 86ita000000000000000000000</p>
                    <p>presso la cassa di risparmio del veneto</p>
                    <p>Informazioni più dettagliate sono visibili alla voce 'Info' del menu Home.</p>
                    <br>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp Bandiera Gialla</p>
                    <br>
                   <p><a href="${confURL}"><button>Conferma adesione</button></a></p>`;
    
                   await sendEmail({
                    to: sendto,
                    subject: 'Bandiera Gialla - Conferma richiesta adesione',
                    html: `<h4>Richiesta Adesione</h4>
                           ${message}`
                });
    }

    
function randomTokenString() {
    return crypto.randomBytes(80).toString('hex');
}


function randomcodadeString() {
  return crypto.randomBytes(5).toString('hex');
}