const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);



const saltRounds = 10;
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);
const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');




const strSql = "select `prenotazevento_confirmeds`.*  from  `prenotazevento_confirmeds` " 

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all conferme prenotazioni - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le conferme prenotazioni ' + result.length);  

            console.log(`rilevate ${result.length} conferme prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale conferme prenotazioni',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo conferma prenotazione
// ------   ok  nuova modalità di craere strsql  
exports.getbyemail = (req,res)=> {
    
    let email = req.params.email;
      
    const strsql = strSql + " where `prenotazevento_confirmeds`.`email` = '" + email + "' ";

    console.log('backend - getbyemail - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma prenotazione for email ' + email);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for email ${email}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   conferme prenotazioni `)

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione email: .....  ${email}`,
                rc: 'ok',
                number: result.length,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} `);
            res.status(200).send({
                message: `nessun user pressente for email: ${email}`,
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });  
}

// creazione nuovo conferma prenotazione   (post)    // ok

exports.createNew = (req,res)=> {
    
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let telefono = req.body.telefono;
      let password = req.body.password;
      let idevento = req.body.idevento;
      let idtipobiglietto = req.body.idtipobiglietto;
      let datapren = req.body.datapren;
      let persone = req.body.persone;
      let token = req.body.token;
      let codpren = req.body.codpren;
      
      let strsql =  `insert into prenotazevento_confirmeds
                  (cognome,nome,email,telefono,password,idevento,idtipobiglietto,datapren,persone,token,codpren) 
                  valueS
                  (
                     '${cognome}','${nome}','${email}','${telefono}','${password}',${idevento},${idtipobiglietto},'${datapren}',${persone},'${token}','${codpren}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova conferma prenotazione evento su tabella prenotazevento_confirmeds ');
              res.status(500).send({
                message: `errore in registrazione nuova conferma prenotazione su tabella prenotazevento_confirmeds - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... conferma prenotazione evento inserita regolarmente `);
          res.status(200).send({
            message: `conferma prenotazione evento inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento conferma prenotazione   // metodo 2  -- funziona  // ok

  exports.updateByemail = (req,res)=> {  

    let email = req.params.emailid;

    console.log(req.body,`Modifica conferma prenotazione evento email ${email}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazevento_confirmeds where email= '" + email + "' ";

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let password = req.body.password;
    let idevento = req.body.idevento;
    let idtipobiglietto = req.body.idtipobiglietto;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let token = req.body.token;
    let codpren = req.body.codpren;

    let strsql =  `update prenotazevento_confirmeds set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    telefono = '${telefono}',
                    password = '${password}',
                    idevento = ${idevento},
                    idtipobiglietto = ${idtipobiglietto},
                    datapren = '${datapren}',
                    persone = ${persone},
                    token = '${token}',
                    codpren = '${codpren}',
                    where email = 'email'`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazevento_confirmeds for email ' + email);
            res.status(500).send({
                message: `4 errore il lettura prenotazevento_confirmeds for email ${email} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento conferma prenotazione email: ${email}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto conferma prenotazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato conferma prenotazione email: ${email}`);
                    res.status(200).send({ 
                        message: `conferma prenotazione aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione email: ${email} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna conferma prenotazione presente for email: ${email}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  











exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prenotazevento_confirmeds where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let password = req.body.password;
    let idevento = req.body.idevento;
    let idtipobiglietto = req.body.idtipobiglietto;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let token = req.body.token;
    let codpren = req.body.codpren;

    let strsql =  `update prenotazevento_confirmeds set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    telefono = '${telefono}',
                    password = '${password}',
                    idevento = ${idevento},
                    idtipobiglietto = ${idtipobiglietto},
                    datapren = '${datapren}',
                    persone = ${persone},
                    token = '${token}',
                    codpren = '${codpren}',
                    where id =  id`;

                    console.log('bk - --------------  manifestazione ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazevento_confirmeds for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazevento_confirmeds for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazevento_confirmeds id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazevento_confirmeds ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazevento_confirmeds id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazevento_confirmeds aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazevento_confirmeds id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna prenotazevento_confirmeds presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  







// cancellazione conferma prenotazione   // ok

exports.delete = (req,res)=> {  

    let email = req.params.email;

    console.log(req.body,`cancellazione conferma prenotazione email ${email}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazevento_confirmeds where email= '" + email + "' ";

    let strsql =  `delete from prenotazevento_confirmeds  where email = ${email}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazevento_confirmeds for email ${email} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma prenotazione email: ${email}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma prenotazione  email: ${email} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione email: ${email} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for email: ${email}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.deletebyid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione conferma prenotazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazevento_confirmeds where id= " + id;

    let strsql =  `delete from prenotazevento_confirmeds  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazevento_confirmeds for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma prenotazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma prenotazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getbytoken = (req,res)=> {
    
    let token = req.params.token;
      
    const strsql = strSql + " where `prenotazevento_confirmeds`.`token` = '" + token + "' ";

    console.log('backend - getbytoken - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma prenotazione for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for token ${token}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------- token -----------------   conferme prenotazioni `)

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione token: .....  ${token}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} `);
            res.status(200).send({
                message: `nessuna conferma prenotazione presente for token: ${token}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getbytokencodpre = (req,res)=> {
    
    let token = req.params.token;
    let codpren = req.params.codpren;
      
   // const strsql = strSql + " where `prenotazevento_confirmeds`.`token` = '" + token + "' and  `prenotazevento_confirmeds`.`codpren` = '" + codpren + "' ";                           ";


    const where = " where `prenotazevento_confirmeds`.`token` = '" + token + "' and `prenotazevento_confirmeds`.`codpren` = '" + codpren + "' ";
    const strsql = strSql + where;

    console.log('backend - getbytokencodpre - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma prenotazione for token ' + token + ' e codpren ' + codpren);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for token ${token} e codpren ${codpren} - errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log('rilevate ' + result.length + '  ----   conferme prenotazioni ' + JSON.stringify(result[0]));

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione token: .....  ${token} e codpren ${codpren}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} e codpren ${codpren}`);
            res.status(200).send({
                message: `nessuna conferma prenotazione presente for token: ${token} e codpre ${codpren}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getbyemaildatapre = (req,res)=> {
    
    
 let email = req.params.email;
 let datapre = req.params.datapre;
   
 // const strsql = strSql + " where `prenotazevento_confirmeds`.`email` = '" + email + "' and  `prenotazevento_confirmeds`.`datapre` = '" + datapre + "' ";  
 const strsql = strSql + ` where 'prenotazevento_confirmeds'.'email' = '${email}' and  'prenotazevento_confirmeds'.'datapre' = '${datapre}'`;                        

 console.log('backend - getbyemaildatapre - strsql --> ' + strsql);
 db.query(strsql,(err,result)=> {
     if(err) {
         console.log(err,'2 errore il lettura conferma prenotazione for email ' + email + ' e datapre ' + datapre);

         res.status(500).send({
             message: `2 errore il lettura conferma prenotazione for email ${email} e datapre ${datapre} - errore: ${err}`,
             data:null
         });
         return;
     }
     
     if(result.length>0) {
         console.log(`rilevate ${result.length}  ------- email ---  datapre --------------   conferme prenotazioni `)

         res.status(200).send({ 
             message:`situazione attuale per conferma prenotazione email: .....  ${email} e datapre ${datapre}`,
             rc: 'ok',
             data:result[0]
         });                    
     }else {
         console.log(`nessun record presente per email: ${email} e datapre ${datapre}`);
         res.status(200).send({
             message: `nessuna conferma prenotazione presente for email: ${email} e datapre ${datapre}`,
             rc: 'nf',
             data:null
         });
     }

    });  

}

exports.destroyToken = (req,res)=> {  

    let token = req.params.token;

    console.log(req.body,`cancellazione conferma prenotazione token ${token}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazevento_confirmeds where token= '" + token + "' ";

    let strsql =  `delete from prenotazevento_confirmeds  where token = '${token}'`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazevento_confirmeds for token ${token} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma prenotazione token: ${token}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma prenotazione  token: ${token} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione token: ${token} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for token: ${token}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.confirmedprenotazione  = (req,res)=> {

    console.log(`backend --  su prenotazioneConfirmedController--- prenotazioneController.confirmedprenotazione - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    const codprenx =  randomcodprenString();
    const token = randomTokenString();

    let descrevento = '';

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let idevento = req.body.idevento;
    let idtipobiglietto = req.body.idtipobiglietto;
    let data1 = req.body.datapren; 
    //  la data arriva gia nel formato dd/mm/aaaa
    /*
    let datapren = req.body.datapren.toString("yyyy-MM-dd HH:mm:ss");

    let dataprennew =  datapren.substring(0, 10);
    // per editare nella mail
    let gg = dataprennew.substr(8,2);
   
    let mm =  dataprennew.substr(5,2);
    let yyyy =  dataprennew.substr(0,4); 

    console.log('data normalizzata: dataprennew ' + dataprennew );
    console.log('data normalizzata: gg ' + gg );
    console.log('data normalizzata: mm ' + mm );
    console.log('data normalizzata: yyyy ' + yyyy );
    

    let data1 = gg + '/' + mm + '/' + yyyy; 
     // let data1 = req.body.datapren.toString("dd/MM/yyyy");
     console.log('-----------------------------  data trattata: ' + dataprennew + '  data originaria: ' + datapren + ' data1: ' + data1);
    */  


    let persone = req.body.persone;
    let codpreny = codprenx.substring(0, 5);
    let codpren = codpreny;

    console.log(`   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);

    // leggo l'evento 
    const id = req.body.idevento;
    
    let strsql1 =  ' select `eventos`.*  from  `eventos` where `eventos`.`id` = ' + id;

   
    console.log('backend - confirmedprenotazione - lettura evento strsql --> ' + strsql1);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql1,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura eventos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura eventos for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   evento `)
            descrevento = result[0].descrizione;
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  


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


    

      let strsql =  `insert into prenotazevento_confirmeds
                (cognome,nome,email,telefono,datapren,persone,codpren,token,idevento,idtipobiglietto) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}','${data1}',${persone},'${codpren}','${token}',${idevento},${idtipobiglietto} 
                )`;

        console.log('--- strsql pronta per fare insert:  ' + strsql );        

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in registrazione conferma Prenotazione evento su tabella prenotazevento_confirmeds ');
            res.status(500).send({
            message: `errore in registrazione conferma Prenotazione evento su tabella prenotazevento_confirmeds - errore: ${err}`,
            data:null
            });
            return;
          }
          send_gmmailfor_prenotazione_eventonormal(req.body.email,req.body.cognome,req.body.nome,token,codpren,descrevento,data1);
          console.log(result, `result ...... conferma Prenotazione evento inserita regolarmente `);
          res.status(200).send({
          message: `prenotazione evento inserito regolarmente`,
          rc: 'ok',
          data:result
          });
      });
    }catch(error){
        res.status(500).json({
            message: "Errore in registrazione richiesta conferma Prenotazione evento",
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


//  metodo creato da moreno per inoltro mail in fase di registrazione nuovo utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_prenotazione_eventonormal(sendto,cognome,nome, token,  codpren, descrevento, dataev) {
    let message;
    
        const confURL = `http://localhost:4210/evento/prenotazionenormaleConferma?token=${token}`;
        message = `<p>Buongiorno sig <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>abbiamo ricevuto la sua richiesta per la partecipazione alla serata </p>
                    <p>${descrevento} in data  ${dataev}.</p>
                    <br>
                    <p>ti ringraziamo per condividere con noi lo spirito di Bandiera Gialla.</p>
                    <br>
                    <p>per garantire la massima sicurezza, ti preghiamo di inserire il codice qui sotto riportato</p>
                    <br>
                    <p>          Codice personale di Prenotazione evento &nbsp;&nbsp;&nbsp; <strong>${codpren}</strong></p>
                    <br>
                   
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la prenotazione</p>
                    <br>
                    <p>Saremo felice di accoglierti e di condividere con noi lo stare assieme</p>
                    <br>
                  
                    <p>Informazioni più dettagliate sono visibili alla voce 'Info' del menu Home.</p>
                    <br>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bandiera Gialla</p>
                    <br>
                   <p><a href="${confURL}"><button>Conferma Prenotazione</button></a></p>`;
    
                   await sendEmail({
                    to: sendto,
                    subject: `Bandiera Gialla - Conferma Prenotazione evento: ${descrevento}`,
                    html: `<h4>Prenotazione serata del ${dataev}</h4>
                           ${message}`
                });
    }
    

    exports.prenotazioneConfermata  = (req,res)=> {

      
    } 


    





function randomTokenString() {
    return crypto.randomBytes(80).toString('hex');
}


function randomcodprenString() {
  return crypto.randomBytes(5).toString('hex');
}

exports.getbyemailUtente = (req,res)=> {
  
    let email = req.params.email;
    let cognome = req.params.cognome;
    let nome = req.params.nome;
    let persone = req.params.persone;
      
    const strsql = strSql + " where `prenotazevento_confirmeds`.`email` = '" + email + "' and `prenotazevento_confirmeds`.`cognome` = '" + cognome + "' and `prenotazevento_confirmeds`.`nome` = '" + nome + "' and `prenotazevento_confirmeds`.`persone` = " + persone;

    console.log('backend - getbyemail - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rs errore il lettura conferma prenotazione for email e altri campi' + email);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for email ${email} e altri campi- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   conferme prenotazioni a evento`)

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione email: .....  ${email} e altri campi`,
                rc: 'ok',
                number: result.length,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} e altri campi`);
            res.status(200).send({
                message: `nessun user pressente for email: ${email} e altri campi`,
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });  
}






exports.confirmedprenotazionelogistica  = (req,res)=> {

    console.log(`backend --  su prenotazioneConfirmedController--- confirmedprenotazionelogistica - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    const codprenx =  randomcodprenString();
    const token = randomTokenString();

    let descrevento = '';

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let idevento = req.body.idevento;
    let idlogistica = req.body.idlogistica;
    let idsettore = req.body.idsettore;
    let idfila = req.body.idfila;
    let idposto = req.body.idposto;
    let idtipobiglietto = req.body.idtipobiglietto;
    let data1 = req.body.datapren; 
    //  la data arriva gia nel formato dd/mm/aaaa
    let persone = req.body.persone;
    let codpren = codprenx.substring(0, 5);
    
    console.log(`   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);

    try{
    

      let strsql =  `insert into prenotazevento_confirmeds
                (cognome,nome,email,telefono,idevento,idlogistica,idsettore,idfila,idposto,datapren,persone,codpren,token,idtipobiglietto) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}',${idevento},${idlogistica},${idsettore},${idfila},${idposto},'${data1}',${persone},'${codpren}','${token}',${idtipobiglietto} 
                )`;

        console.log('--- strsql pronta per fare insert:  ' + strsql );        

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in registrazione conferma Prenotazione evento su tabella prenotazevento_confirmeds ');
            res.status(500).send({
            message: `errore in registrazione conferma Prenotazione evento su tabella prenotazevento_confirmeds - errore: ${err}`,
            data:null
            });
            return;
          }
       
          console.log(result, `result ...... conferma Prenotazione evento inserita regolarmente `);
          res.status(200).send({
          message: `prenotazione evento inserito regolarmente`,
          rc: 'ok',
          data:result
          });
      });
    }catch(error){
        res.status(500).json({
            message: "Errore in registrazione richiesta conferma Prenotazione evento",
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

exports.invioemailconfirmedprenotazionelogistica  = (req,res)=> {

 
    let email = req.params.email;
    let cognome = req.params.cognome;
    let nome = req.params.nome;
    let keyuserpren = req.params.keyuserpren;
    let devento = req.params.devento;
    let dataev = req.params.dataev;

    const codprenx =  randomcodprenString();
    const codpren = codprenx.substring(0, 5);
    const token = randomTokenString();

    try{
        send_gmmailfor_prenotazione_eventologistica(email,cognome,nome,token,codpren,devento,dataev,keyuserpren);
        console.log(`result ...... conferma Prenotazione evento inserita regolarmente `);
        res.status(200).send({
        message: `prenotazione evento inserito regolarmente`,
        rc: 'ok',
        codpren: codpren,
        token: token,
        data: null
        });
    }catch(error){
        res.status(500).json({
            message: "Errore in invio email confirmed prenotazione evento con logistica",
            PrenConfirm: [],
            error: error.message
        });
  }



}


async function send_gmmailfor_prenotazione_eventologistica(sendto,cognome,nome, token,  codpren, descrevento, dataev,keyuserpren) {
    let message;
    
        const confURL = `http://localhost:4210/evento/prenotazionelogisticaConferma?token=${token}&keyuserpren=${keyuserpren}`;
        message = `<p>Buongiorno sig <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>abbiamo ricevuto la sua richiesta per la partecipazione alla serata </p>
                    <p>${descrevento} in data  ${dataev}.</p>
                    <br>
                    <p>ti ringraziamo per condividere con noi lo spirito di Bandiera Gialla.</p>
                    <br>
                    <p>hai effettuato la regsitrazione di alcuni biglietti nominativi.</p>
                    <p>Ti preghiamo di voler procedere alla conferma delle richieste</p>
                    <br>
                    <p>per garantire la massima sicurezza, ti preghiamo di inserire il codice qui sotto riportato</p>
                    <br>
                    <p>          Codice personale di Prenotazione evento &nbsp;&nbsp;&nbsp; <strong>${codpren}</strong></p>
                    <br>
                   
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la prenotazione</p>
                    <br>
                    <p>Saremo felice di accoglierti e di condividere con noi lo stare assieme</p>
                    <br>
                  
                    <p>Informazioni più dettagliate sono visibili alla voce 'Info' del menu Home.</p>
                    <br>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bandiera Gialla</p>
                    <br>
                   <p><a href="${confURL}"><button>Conferma Prenotazione</button></a></p>`;
    
                   await sendEmail({
                    to: sendto,
                    subject: `Bandiera Gialla - Conferma Prenotazione evento con Logistica: ${descrevento}`,
                    html: `<h4>Prenotazione serata del ${dataev}</h4>
                           ${message}`
                });
    }
    


   