// creo i metodi per la gestione dell'utente

const db = require('../db');


exports.getAllRuoli = (req,res)=> {
 
    let strsql = 'select * from t_ruolos';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_ruolos');
        }
        if(result.length>0) {
            console.log('lettura tutti i ruoli ' + result.length);  

            console.log(`rilevati ${result.length} ruoli `)
            res.send({
                message:'Situazione attuale Ruoli',
                rc: 'ok',
                data:result
            });
        }else {
            console.log('nessun record presente ' + result.length); 
            res.send({
                message:'nessun record presente',
                rc: 'nf',
                data:null
            });
        }

    });
}

// lettura singolo Ruolo
exports.getRuolobyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_ruolos where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_ruolos for id ' + id);       }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Ruoli `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Ruoli`,
                message:`situazione attuale per ruolo id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${id} `); 
            res.send({
                message: `nessun ruolo presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo ruolo   (post)

exports.createNewRuolo = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_ruolo = req.body.d_ruolo;
      let tappo = req.body.tappo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into t_ruolos
                  (id,d_ruolo,tappo,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_ruolo}','${tappo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo ruolo su tabella t_ruolos ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Ruolo inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateRuoloByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Ruolo id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_ruolo = req.body.d_ruolo;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update t_ruolos set
                    d_ruolo = '${d_ruolo}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento ruolo id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Ruolo aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruolo id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun ruolo presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateRuoloByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica ruolo id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolos where id= ${id} `;
    
    // definisco 
   let ruolonew = {
            d_ruolo: req.body.d_ruolo,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_ruolos SET ? WHERE id = ' + req.params.id, ruolonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento ruolo id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruolo aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruolo id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun ruolo pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione ruolo

exports.deleteRuolo = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione ruolo id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolos where id= ${id} `;

    let strsql =  `delete from t_ruolos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione ruolo id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruolo  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruolo id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun ruolo presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

