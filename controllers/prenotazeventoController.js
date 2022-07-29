const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

const strSql = "select `prenotazeventos`.*, `t_stato_prenotazeventos`.`d_stato_prenotazione`  from  `prenotazeventos` " + 
               " inner join `t_stato_prenotazeventos` ON `t_stato_prenotazeventos`.`id` = `prenotazeventos`.`idstato` " 

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all prenotazioni evento - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioni evento ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
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

// lettura singolo prenotazione evento
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotazeventos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotazeventos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazione evento for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazione evento for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazioni evento `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazione evento id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo prenotazione evento   (post)    // ok

exports.createNew = (req,res)=> {
    
      console.log(req.body,'Creazione nuovo prenotazione evento');  // visualizzo la struttura dei campi immessi dall'prenotazione evento 
  
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let telefono = req.body.telefono;
      let idevento = req.body.idevento;
      let idlogistica = req.body.idlogistica;
      let idsettore = req.body.idsettore;
      let idfila = req.body.idfila;
      let idposto = req.body.idposto;
      let idtipobiglietto = req.body.idtipobiglietto;
      let datapren = req.body.datapren;
      let persone = req.body.persone;
      let email = req.body.email;
     
      let strsql =  `insert into prenotazeventos
                  (cognome,nome,telefono,idevento,idlogistica,idsettore,idfila,idposto,idtipobiglietto ,datapren,persone,email) 
                  valueS
                  (
                     '${cognome}','${nome}','${telefono}',${idevento},${idlogistica},${idsettore},${idfila},${idposto},${idtipobiglietto},'${datapren}',${persone},'${email}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova prenotazione evento su tabella prenotazeventos ');
              res.status(500).send({
                message: `errore in registrazione nuova prenotazione evento su tabella prenotazeventos - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... prenotazione evento inserita regolarmente `);
          res.status(200).send({
            message: `prenotazione evento inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento prenotazione evento   // metodo 2  -- funziona  // ok

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazione evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione evento 

    // definisco la strsql per lettura prenotazione evento

    let strsql_Inqu = `select * from prenotazeventos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let idevento = req.body.idevento;
    let idlogistica = req.body.idlogistica;
    let idsettore = req.body.idsettore;
    let idfila = req.body.idfila;
    let idposto = req.body.idposto;
    let idtipobiglietto = req.body.idtipobiglietto;
    let idbiglietto = req.body.idbiglietto;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let email = req.body.email;
    let idstato = req.body.idstato;

   

    let strsql =  `update prenotazeventos set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    telefono = '${telefono}',
                    idevento = ${idevento},
                    idlogistica = ${idlogistica},
                    idsettore = ${idsettore},
                    idfila = ${idfila},
                    idposto = ${idposto},
                    idtipobiglietto = ${idtipobiglietto},
                    idbiglietto = ${idbiglietto},
                    datapren = '${datapren}',
                    persone = ${persone},
                    email = '${email}',
                    idstato = ${idstato}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazeventos for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazeventos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazione evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazione evento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazione evento id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazione evento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazione evento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento prenotazione evento   // metodo 1  -- da sistemare


// cancellazione prenotazione evento   // ok

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prenotazione evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione evento 

    // definisco la strsql per lettura prenotazione evento

    let strsql_Inqu = `select * from prenotazeventos where id= ${id} `;

    let strsql =  `delete from prenotazeventos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazeventos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazione evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazione evento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazione evento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazione evento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getPrenotazinidaEvadere = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazinidaEvadere ' );
    
    let stato = 0;
    let strsql = '';
  
    strsql =  strSql + ' where `idstato` = ' + stato;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotazeventos da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutte le prenotazioni evento da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento da evadere',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

//  ok
exports.getPrenotazinidaEvaderebyevento = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazinidaEvaderebyevento ' + req.params.idevento);
    
    let idevento = req.params.idevento;
    let stato = 0;
    let strsql = '';
  
    strsql =  strSql + ' where `idstato` = ' + stato + ' and `idevento` = ' + idevento;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotazeventos da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti gli prenotazioni evento da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente !! `,
                number:  result.length,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

// ok
exports.getPrenotazinibystato = (req,res)=> {
    
    console.log('backend -----------------------------  getPrenotazinibystato ' + req.params.stato);
  
    let stato = req.params.stato;
    let ruolo2 = req.params.ruolo2;
    let strsql = '';

    strsql =  strSql + ' where `idstato` >= ' + stato;  
    console.log(`strsql:  ${strsql} `);
  
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `55x errore il lettura all prenotazeventos per stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('yyy - lettura tutte le  prenotazioni evento per stato' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento per stato',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ok  
exports.getPrenotazionibyemail = (req,res)=> {
    
    let email = req.params.email;
    let strsql = '';

    console.log('backend -----------------------------  getPrenotazinibyemail ' + req.params.email);
    
   
    strsql =  strSql + " where `email` = '" + email + "' ";  
    console.log(`strsql:  ${strsql} `);
      db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotazeventos per email - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xyz - lettura tutte le prenotazioni evento per email' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento per email',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente con la email richiesta  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

exports.sendmailprenconfirmed = (req,res)=> {

    let email = req.params.email;
    console.log(`backend --  sendmailprenconfirmed - appena entrato`);
    
    console.log('parametri Passati Body : ' + JSON.stringify(req.body));   
    console.log('params : ' + JSON.stringify(req.params)); 

    try{
  
      let cognome = req.body.cognome;
      let nome = req.body.nome;
    //  let email = req.body.email;
      let persone = req.body.persone;
      let datapren = req.body.datapren.toString("yyyy-MM-dd HH:mm:ss");

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
*/

console.log('-----------------------------  data trattata: ' + datapren );
   
      send_gmmailfor_prenotazioneeventoConfermata(email,cognome,nome,persone, datapren);
   //   console.log(result, `result ...... email di confermadefinitiva prenotazione evento inviata regolarmente `);
      res.status(200).send({
      message: `email di conferma definitiva prenotazione evento inviata regolarmente`,
      rc: 'ok',
      });


    }catch(error){
        res.status(500).json({
            message: "Errore in invio mail dopo conferma definitiva Prenotazione ",
            PrenConfirm: [],
            error: error.message
        });
  }


}



//  metodo creato da moreno per inoltro mail dopo conferma prenotazione evento dell'utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_prenotazioneeventoConfermata(sendto,cognome,nome, persone, data1) {

    console.log('send_gmmailfor_prenotazione eventoConfermata - email: ' + sendto);
    let message;
    
     
        message = `<p>Grazie <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>per averci confermato la tua presenza alla serata del ${data1}.</p>
                    <br>
                    <p>ti abbiamo riservato ${persone} posti e ....  </p>
                    <p>ti aspettiamo per passare in allegria una bella serata</p>
                    <br>
                    <p></p>`;
        
                   await sendEmail({
                    to: sendto,
                    subject: 'bandiera Gialla - Conferma Prenotazione Evento',
                    html: `<h4>Prenotazione serata del ${data1}</h4>
                           ${message}`
                });
    }


    exports.getPrenotazinibyevento = (req,res)=> {

        console.log('backend -----------------------------  getPrenotazinidaEvaderebyevento ' + req.params.idevento);
        
        let idevento = req.params.idevento;
      
        let strsql = '';
      
        strsql =  strSql + ' where idevento = ' + idevento;  
        console.log(`strsql:  ${strsql} `);
        db.query(strsql,(err,result)=> {
            if(err) {
               res.status(500).send({
                    message: `3x errore il lettura all prenotazeventos per evento - erro: ${err}`,
                    data:null
                });
                return;
            }
            if(result.length>0) {
                console.log('xxx - lettura tutti gli prenotazioni evento per id' + result.length);  
    
                console.log(`rilevate ${result.length} prenotazioni evento `)
                res.status(200).send({ 
                    message:'Situazione attuale prenotazioni evento',
                    number:  result.length,
                    rc: 'ok',
                    data:result
                });                    
            }else {
                console.log('nessun record presente ' + result.length); 
    
                res.status(200).send({ 
                    message: `nessuna prenotazione evento presente !! `,
                    number:  result.length,
                    rc: 'nf',
                    data:null
                });                    
            }
    
        });
    
    }

    



    /*
     test per postman

http://localhost:3001/prenotazevento/pren/invioemailprenotazione/ghisellini.moreno@libero.it

backend --  sendmailprenconfirmed - appena entrato
parametri Passati Body : {}
params : {"email":"ghisellini.moreno@libero.it:"}
backend --  sendmailprenconfirmed - appena entrato
parametri Passati Body : {}
params : {"email":"ghisellini.moreno@libero.it"}





    */