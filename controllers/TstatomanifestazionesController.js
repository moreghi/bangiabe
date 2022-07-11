// creo i metodi per la gestione dell'manifestazione

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_manifestaziones';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_manifestaziones');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati manifestazione ' + result.length);  

            console.log(`rilevati ${result.length} stati manifestazione `)
            res.send({
                message:'Situazione attuale stati manifestazione',
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
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  
    let strsql = `select * from t_stato_manifestaziones where id= ${key} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_manifestaziones for key ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati manifestazione `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${key} -------   Stati manifestazione`,
                message:`situazione attuale per ruolo id: .....  ${key}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${key} `); 
            res.send({
                message: `nessun ruolo presente for id: ${key}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo ruolo   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo manifestazione');  // visualizzo la struttura dei campi immessi dall'manifestazione 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_manifestazione = req.body.d_stato_manifestazione;
      let tappo = req.body.tappo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into t_stato_manifestaziones
                  (id,d_stato_manifestazione,tappo,key_utenti_operation) 
                  valueS
                  (
                    ${id} ,UPPER'${d_stato_manifestazione}'),'${tappo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato manifestazione su tabella t_stato_manifestaziones ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Stato Utente inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica Stato manifestazione id ${key}`);  // visualizzo la struttura dei campi immessi dall'manifestazione 

    // definisco la strsql per lettura manifestazione

    let strsql_Inqu = `select * from t_stato_manifestaziones where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_manifestazione = req.body.d_stato_manifestazione;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_manifestaziones set
                    d_stato_manifestazione = UPPER('${d_stato_manifestazione}'),
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_manifestaziones for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato manifestazione id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Ruolo aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato manifestazione id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato manifestazione presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateByid1 = (req,res)=> {

    let key = req.params.id;

    console.log(req.body,`Modifica stato manifestazione id ${key}`);  // visualizzo la struttura dei campi immessi dall'manifestazione 

  // definisco la strsql per lettura manifestazione

    let strsql_Inqu = `select * from t_stato_manifestaziones where id= ${key} `;
    
    // definisco 
   let stato = {
            d_stato_manifestazione: req.body.d_stato_manifestazione,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_manifestaziones for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_manifestaziones SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato manifestazione id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato manifestazione aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato manifestazione id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato manifestazione presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione ruolo

exports.delete = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`cancellazione stato manifestazione id ${key}`);  // visualizzo la struttura dei campi immessi dall'manifestazione 

    // definisco la strsql per lettura manifestazione

    let strsql_Inqu = `select * from t_stato_manifestaziones where id= ${key} `;

    let strsql =  `delete from t_stato_manifestaziones  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_manifestaziones for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato manifestazione id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato manifestazione  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato manifestazione id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato manifestazione presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_stato_manifestaziones';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_stato_manifestaziones`.`id` < ' + tappo + ' order by `t_stato_manifestaziones`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all manifestaziones - erro: ${err}`,
                data:null
            });
            return;  
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} tabella Manifestazione  `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuno stato presente  `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

