const strSql = 'select `logsettores`.*  ' +  
                ' FROM `logsettores` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let idlog = req.params.idlog;


    let strsql = strSql + ' where `logsettores`.`idLogistica` = ' + idlog; // 'select * from logsettores';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all logsettores - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli logsettori ' + result.length);  

            console.log(`rilevati ${result.length} logsettori `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun evento presente `,
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
    
    const strsql = strSql + ' where `logsettores`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from logsettores where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura logsettores for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura logsettores for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   evento `)

            res.status(200).send({ 
                message:`situazione attuale per evento id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun evento presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo evento   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo settore');  // visualizzo la struttura dei campi immessi dall'evento 
  
      // creo le variabili dai campi di input

      let idLogistica = req.body.idLogistica;
      let stato = req.body.stato;
      let dsettore = req.body.dsettore;
      let key_utenti_operation = req.body.key_utenti_operation;
      

      console.log('backend ------------ logSettore ---------------------------- Creazione nuovo settore ' + req.body.data );

      let strsql =  `insert into logsettores
                  (idLogistica,stato,dsettore,key_utenti_operation) 
                  valueS
                  (
                    ${idLogistica},${stato},UPPER('${dsettore}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova logSettore su tabella logsettores ');
              res.status(500).send({
                message: `errore in registrazione nuovo logSettore su tabella logsettores - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... logSettore inserito regolarmente `);
          res.status(200).send({
            message: `evento inserita regolarmente`,
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

    let strsql_Inqu = `select * from logsettores where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idLogistica = req.body.idLogistica;
    let stato = req.body.stato;
    let dsettore = req.body.dsettore;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update logsettores set
                    idLogistica = ${idLogistica},
                    stato = ${stato},
                    dsettore = UPPER('${dsettore}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura logsettores for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura logsettores for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto evento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata eventoevento id: ${id}`);
                    res.status(200).send({ 
                        message: `evento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente evento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna evento presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from logsettores where id= ${id} `;
    
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
                message: `5 errore il lettura logsettores for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura logsettores for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE logsettores SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
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

    let strsql_Inqu = `select * from logsettores where id= ${id} `;

    let strsql =  `delete from logsettores  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura logsettores for key ${id} - errore: ${err}`,
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

exports.getbySettore = (req,res)=> {
    
    let idlog = req.params.idlog;
    let id = req.params.idsettore;

    const strsql = strSql + ' where `logsettores`.`idLogistica` = ' + idlog + ' and `logsettores`.`id` = ' + id;

    console.log('backend - getbyFila - strsql --> ' + strsql);
  
   // let strsql = `select * from logsettores where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2gh errore il lettura logsettores for idlog ' + idlog + '  e id ' + id);

            res.status(500).send({
                message: `2 errore il lettura logsettores for idlog ${idlog} e id ${id} - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   evento `)

            res.status(200).send({ 
                message:`situazione attuale per logfila idlog ${idlog} e id ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per idlog ${idlog} e id ${id} `);
            res.status(200).send({
                message: `nessun record presente for idlog ${idlog} e id ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}




