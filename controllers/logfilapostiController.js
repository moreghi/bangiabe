const strSql = 'select `logsettfilapostis`.*  ' +  
                ' FROM `logsettfilapostis` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let idlog = req.params.idlog;
    let order = ' order by `logsettfilapostis`.`idSettore`, `logsettfilapostis`.`idFila` '


    let strsql = strSql + ' where `logsettfilapostis`.`idLogistica` = ' + idlog + order; // 'select * from logsettfilapostis';
    
   console.log('logfilaposti - getAll - strsql: ' + strsql);
   
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3gy errore il lettura all logsettfilapostis - error: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli logsettfilaposti ' + result.length);  

            console.log(`rilevati ${result.length} logsettfilaposti `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun record presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo evento
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `logsettfilapostis`.`id` = ' + id;

    console.log('backend logsettfilaposti ------- - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from logsettfilapostis where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura logsettfilapostis for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura logsettfilapostis for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevato ${result.length}  ------------------------   record posti `)

            res.status(200).send({ 
                message:`situazione attuale per posti id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun record presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo evento   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuova SettFilaPosti');  // visualizzo la struttura dei campi immessi dall'evento 
  
      // creo le variabili dai campi di input

      let idLogistica = req.body.idLogistica;
      let idSettore = req.body.idSettore;
      let idFila = req.body.idFila;
      let stato = req.body.stato;
      let postoStart = req.body.postoStart;
      let postoEnd = req.body.postoEnd;
      let key_utenti_operation = req.body.key_utenti_operation;
      

      console.log('backend ------------ SettFilaPosti ---------------------------- Creazione nuovo record ' + req.body.data );

      let strsql =  `insert into logsettfilapostis
                  (idLogistica,idSettore,idFila,stato,postoStart,postoEnd,key_utenti_operation) 
                  valueS
                  (
                    ${idLogistica},${idSettore},${idFila},${stato},${postoStart},${postoEnd},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova SettFilaPosti su tabella logsettfilapostis ');
              res.status(500).send({
                message: `errore in registrazione nuova SettFilaPosti su tabella logsettfilapostis - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... SettFilaPosti inserita regolarmente `);
          res.status(200).send({
            message: `SettFilaPosti inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento evento   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from logsettfilapostis where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idLogistica = req.body.idLogistica;
    let idSettore = req.body.idSettore;
    let idFila = req.body.idFila;
    let stato = req.body.stato;
    let postoStart = req.body.postoStart;
    let postoEnd = req.body.postoEnd;
    let errorposti = req.body.errorposti;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update logsettfilapostis set
                    idLogistica = ${idLogistica},
                    idSettore = ${idSettore},
                    idFila = ${idFila},
                    stato = ${stato},
                    postoStart = ${postoStart},
                    postoEnd = ${postoEnd},
                    errorposti = '${errorposti}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura logsettfilapostis for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura logsettfilapostis for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento SettFilaPosti id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto SettFilaPosti ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata SettFilaPosti id: ${id}`);
                    res.status(200).send({ 
                        message: `Posti aggiornati regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente SettFilaPosti id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun SettFilaPosti presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento evento   // metodo 1  -- funziona

exports.updateeventoByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

  // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from logsettfilapostis where id= ${id} `;
    
    // definisco 
   let eventonew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            eventoname: req.body.eventoname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            noteevento: req.body.noteevento,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura logsettfilapostis for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura logsettfilapostis for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE logsettfilapostis SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto evento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `evento aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente evento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun evento pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione evento

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from logsettfilapostis where id= ${id} `;

    let strsql =  `delete from logsettfilapostis  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura logsettfilapostis for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione evento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `evento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente evento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna evento presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



exports.getbySettFila = (req,res)=> {
 
    let idlog = req.params.idlog;
    let idsett = req.params.idsett;
    let idfila = req.params.idfila;


    let strsql = strSql + ' where `logsettfilapostis`.`idLogistica` = ' + idlog + ' and `logsettfilapostis`.`idSettore` = ' + idsett + ' and `logsettfilapostis`.`idFila` = ' + idfila; // 'select * from logsettfilapostis';
   
   console.log('logfilaposti - getbySettFila - strsql: ' + strsql);
   
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `9fg errore il lettura all logsettfilapostis - error: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura  logsettfilaposti ' + result.length);  

            console.log(`rilevati ${result.length} logsettfilaposti `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun record presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getbySett = (req,res)=> {
 
    let idlog = req.params.idlog;
    let idsett = req.params.idsett;
  

    let strsql = strSql + ' where `logsettfilapostis`.`idLogistica` = ' + idlog + ' and `logsettfilapostis`.`idSettore` = ' + idsett; // 'select * from logsettfilapostis';
   
   console.log('logfilaposti - getbySett - strsql: ' + strsql);
   
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `gk1 errore il lettura all logsettfilapostis - error: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura  logsettfilaposti per settori ' + result.length);  

            console.log(`rilevati ${result.length} logsettfilaposti `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun record presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

