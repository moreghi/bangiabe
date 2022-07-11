const strSql = 'select `bandieragiallas`.* ' +
                ' FROM `bandieragiallas` ' 

const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from bandieragiallas';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all bandieragiallas - erro: ${err}`,
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
    
    const strsql = strSql + ' where `bandieragiallas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from bandieragiallas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura bandieragiallas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura bandieragiallas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   associazione `)

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
      let id = req.body.id;
      let nomeassociazione = req.body.nomeassociazione;
      let email = req.body.email;
      let indirizzo = req.body.indirizzo;
      let telefono = req.body.telefono;
      let cellulare = req.body.cellulare;
      let codfisc = req.body.codfisc;
      let piva = req.body.piva;
      let iban = req.body.iban;
      let banca = req.body.banca;
      let ultimaTessera = req.body.ultimaTessera;
      let key_utenti_operation = req.body.key_utenti_operation;
      
      let strsql =  `insert into bandieragiallas
                  (id,nomeassociazione,email,indirizzo,telefono,cellulare,codfisc,piva,iban,banca,ultimaTessera,key_utenti_operation) 
                  valueS
                  (
                     ${id},UPPER('${nomeassociazione}'),'${email}',UPPER('${indirizzo}'),'${telefono}','${cellulare}',UPPER('${codfisc}'),'${piva}',UPPER('${iban}'),UPPER('${banca}'),${ultimaTessera},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova Associazione su tabella bandieragiallas ');
              res.status(500).send({
                message: `errore in registrazione nuova associazione su tabella bandieragiallas - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... associazione inserita regolarmente `);
          res.status(200).send({
            message: `associazione inserita regolarmente`,
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

    let strsql_Inqu = `select * from bandieragiallas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let nomeassociazione = req.body.nomeassociazione;
    let email = req.body.email;
    let indirizzo = req.body.indirizzo;
    let telefono = req.body.telefono;
    let cellulare = req.body.cellulare;
    let codfisc = req.body.codfisc;
    let piva = req.body.piva;
    let iban = req.body.iban;
    let banca = req.body.banca;
    let ultimaTessera = req.body.ultimaTessera;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update bandieragiallas set
                    nomeassociazione = UPPER('${nomeassociazione}'),
                    email = '${email}',
                    indirizzo = UPPER('${indirizzo}'),
                    telefono = '${telefono}',
                    cellulare = '${cellulare}',
                    codfisc = UPPER('${codfisc}'),
                    piva = '${piva}',
                    iban = UPPER('${iban}'),
                    banca = UPPER('${banca}'),
                    ultimaTessera = ${ultimaTessera},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura bandieragiallas for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura bandieragiallas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento associazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto associazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata associazionesocio id: ${id}`);
                    res.status(200).send({ 
                        message: `associazione aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente associazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna associazione presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from bandieragiallas where id= ${id} `;
    
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
                message: `5 errore il lettura bandieragiallas for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura bandieragiallas for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE bandieragiallas SET ? WHERE id = ' + req.params.id, socionew,(err,result) => {    
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

    let strsql_Inqu = `select * from bandieragiallas where id= ${id} `;

    let strsql =  `delete from bandieragiallas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura bandieragiallas for key ${id} - errore: ${err}`,
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



