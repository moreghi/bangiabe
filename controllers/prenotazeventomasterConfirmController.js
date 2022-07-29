const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);



const saltRounds = 10;
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);
const nodemailer = require('nodemailer');
const sendEmail = require('../helpers/send-email');




const strSql = "select `prenotazeventomaster_confirmeds`.*  from  `prenotazeventomaster_confirmeds` " 

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

exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `prenotazeventomaster_confirmeds`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from t_taglia_bigliettos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazeventomaster_confirmeds for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazeventomaster_confirmeds for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   evento `)

            res.status(200).send({ 
                message:`situazione attuale per conferma evento logistica: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun taglio presente for id: ${id}`,
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
      
    const strsql = strSql + " where `prenotazeventomaster_confirmeds`.`email` = '" + email + "' ";

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
         
      const codprenx =  randomcodprenString();
      const token = randomTokenString();
      
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let telefono = req.body.telefono;
      let idevento = req.body.idevento;
      let devento = req.body.devento;
      let idlogistica = req.body.idlogistica;
      let idsettore = req.body.idsettore;
      let idfila = req.body.idfila;
      let idposto = req.body.idposto;
      let idtipobiglietto = req.body.idtipobiglietto;
      let data1 = req.body.datapren; 
      let codpren = codprenx.substring(0, 5);
      let keyuserpren = req.body.keyuserpren;

      let strsql =  `insert into prenotazeventomaster_confirmeds
                    (cognome,nome,email,telefono,idevento,devento,idlogistica,idsettore,idfila,idposto,idtipobiglietto,datapren,codpren,token,keyuserpren) 
                    valueS
                    (
                        UPPER('${cognome}'),UPPER('${nome}'), LOWER('${email}'),'${telefono}',${idevento},UPPER('${devento}'),${idlogistica},${idsettore},${idfila},${idposto},${idtipobiglietto},'${data1}','${codpren}','${token}','${keyuserpren}'
                    )`;
    
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova conferma prenotazione evento su tabella prenotazeventomaster_confirmeds ');
              res.status(500).send({
                message: `errore in registrazione nuova conferma prenotazione su tabella prenotazeventomaster_confirmeds - errore: ${err}`,
                data:null
            });
            return;
          }
          send_gmmailfor_prenotazione_eventologistica(req.body.email,req.body.cognome,req.body.nome,token,codpren,devento,data1,keyuserpren);
          console.log(result, `result ...... conferma Prenotazione evento inserita regolarmente `);
          res.status(200).send({
            message: `prenotazione evento master da confermare inserito regolarmente`,
            rc: 'ok',
            codpren: codpren,
            token: token,
            keyuserpren: keyuserpren,
            data:result
          });
     });
    
  }
 
 
exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prenotazeventomaster_confirmeds where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let idevento = req.body.idevento;
    let idtipobiglietto = req.body.idtipobiglietto;
    let datapren = req.body.datapren;
    let token = req.body.token;
    let codpren = req.body.codpren;
    let devento = req.body.devento;



    let strsql =  `update prenotazeventomaster_confirmeds set
                    cognome = UPPER('${cognome}'),
                    nome =  UPPER('${nome}'),
                    telefono = '${telefono}',
                    idevento = ${idevento},
                    devento =  UPPER('${devento}'),
                    idtipobiglietto = ${idtipobiglietto},
                    datapren = '${datapren}',
                    token = '${token}',
                    codpren = '${codpren}',
                    where id =  id`;

                    console.log('bk - --------------  manifestazione ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazeventomaster_confirmeds for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazeventomaster_confirmeds for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazeventomaster_confirmeds id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazeventomaster_confirmeds ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazeventomaster_confirmeds id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazeventomaster_confirmeds aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazeventomaster_confirmeds id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna prenotazeventomaster_confirmeds presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = "select * from prenotazeventomaster_confirmeds where email= '" + email + "' ";

    let strsql =  `delete from prenotazeventomaster_confirmeds  where email = ${email}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazeventomaster_confirmeds for email ${email} - errore: ${err}`,
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

    let strsql_Inqu = "select * from prenotazeventomaster_confirmeds where id= " + id;

    let strsql =  `delete from prenotazeventomaster_confirmeds  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazeventomaster_confirmeds for id ${id} - errore: ${err}`,
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


exports.getPrenotazbycodpren = (req,res)=> {
    
    let codpren = req.params.codpren;
      
    const strsql = strSql + " where `prenotazeventomaster_confirmeds`.`codpren` = '" + codpren + "' ";

    console.log('backend - getPrenotazbycodpren - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma prenotazione for codpren ' + codpren);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for codpren ${codpren}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------- codpren -----------------   conferme prenotazioni `)

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione codpren: .....  ${codpren}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per codpren: ${codpren} `);
            res.status(200).send({
                message: `nessuna conferma prenotazione presente for codpren: ${codpren}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

//-----------------------------------------   ok
exports.getbytokencodpre = (req,res)=> {
    
    let token = req.params.token;
    let codpren = req.params.codpren;
      
   // const strsql = strSql + " where `prenotazeventomaster_confirmeds`.`token` = '" + token + "' and  `prenotazeventomaster_confirmeds`.`codpren` = '" + codpren + "' ";                           ";


    const where = " where `prenotazeventomaster_confirmeds`.`token` = '" + token + "' and `prenotazeventomaster_confirmeds`.`codpren` = '" + codpren + "' ";
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

// ------------------------------------------------   ok
exports.getbyemaildatapre = (req,res)=> {
    
    
 let email = req.params.email;
 let datapre = req.params.datapre;
   
 // const strsql = strSql + " where `prenotazeventomaster_confirmeds`.`email` = '" + email + "' and  `prenotazeventomaster_confirmeds`.`datapre` = '" + datapre + "' ";  
 const strsql = strSql + ` where 'prenotazeventomaster_confirmeds'.'email' = '${email}' and  'prenotazeventomaster_confirmeds'.'datapre' = '${datapre}'`;                        

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

exports.destroycodpren = (req,res)=> {  

    let codpren = req.params.codpren;

    console.log(req.body,`cancellazione conferma prenotazione codpren ${codpren}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazeventomaster_confirmeds where codpren= '" + codpren + "' ";

    let strsql =  `delete from prenotazeventomaster_confirmeds  where codpren = '${codpren}'`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazeventomaster_confirmeds for codpren ${codpren} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma prenotazione codpren: ${codpren}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma prenotazione  codpren: ${codpren} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione codpren: ${codpren} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for codpren: ${codpren}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.destroytoken = (req,res)=> {  

    let token = req.params.token;

    console.log(req.body,`cancellazione conferma prenotazione token ${token}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazeventomaster_confirmeds where token= '" + token + "' ";

    let strsql =  `delete from prenotazeventomaster_confirmeds  where token = '${token}'`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazeventomaster_confirmeds for codpren ${codpren} - errore: ${err}`,
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





function randomTokenString() {
    return crypto.randomBytes(80).toString('hex');
}


function randomcodprenString() {
  return crypto.randomBytes(5).toString('hex');
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
    

    /*

    non serve più 

    exports.confirmedprenotazionemaster  = (req,res)=> {

    console.log(`backend --  su prenotazeventomaster_confirmeds --- confirmedprenotazione - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   

    // leggo l'evento 
    const id = req.body.idevento;
    
    let strsql1 =  ' select `eventos`.*  from  `eventos` where `eventos`.`id` = ' + id;

   
    console.log('backend - confirmedprenotazionemaster - lettura evento strsql --> ' + strsql1);
  
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
        let codpren = codprenx.substring(0, 5);
        let keyuserpren = req.body.keyuserpren;

        let strsql =  `insert into prenotazeventomaster_confirmeds
                (cognome,nome,email,telefono,idevento,idlogistica,idsettore,idfila,idposto,idtipobiglietto,datapren,codpren,token,keyuserpren) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}',${idevento},${idlogistica},${idsettore},${idfila},${idposto},${idtipobiglietto},'${data1}','${codpren}','${token}','${keyuserpren}'
                )`;

        console.log('--- strsql pronta per fare insert:  ' + strsql );        

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in registrazione conferma Prenotazione evento su tabella prenotazeventomaster_confirmeds ');
            res.status(500).send({
            message: `errore in registrazione conferma Prenotazione evento su tabella prenotazeventomaster_confirmeds - errore: ${err}`,
            data:null
            });
            return;
          }
          send_gmmailfor_prenotazione_eventologistica(req.body.email,req.body.cognome,req.body.nome,token,codpren,descrevento,data1,keyuserpren);
          console.log(result, `result ...... conferma Prenotazione evento inserita regolarmente `);
          res.status(200).send({
          message: `prenotazione evento inserito regolarmente`,
          rc: 'ok',
          codpren: codpren,
          token: token,
          keyuserpren: keyuserpren,
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

} 




    */

   