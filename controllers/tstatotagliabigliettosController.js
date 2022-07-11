// creo i metodi per la gestione dell'biglietto

const db = require('../db');
let strSql = 'select * from t_stato_taglia_bigliettos';

exports.getAll = (req,res)=> {
     
    let strsql = strSql;
    console.log('tstatobiglietto - ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_bigliettos');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati biglietto ' + result.length);  

            console.log(`rilevati ${result.length} stati biglietto `)
            res.send({
                message:'Situazione attuale stati biglietto',
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
    
    let id = req.params.id;
    let strsql = strSql +  ' where id= ' + id;
   
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_bigliettos for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati biglietto `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati biglietto`,
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

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo biglietto');  // visualizzo la struttura dei campi immessi dall'biglietto 
  
      // creo le variabili dai campi di input
      let d_stato_taglia_biglietto = req.body.d_stato_taglia_biglietto;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      let strsql =  `insert into t_stato_taglia_bigliettos
                  (d_stato_taglia_biglietto,key_utenti_operation) 
                  valueS
                  (
                    UPPER'${d_stato_taglia_biglietto}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato biglietto su tabella t_stato_bigliettos ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Stato biglietto inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Stato biglietto id ${id}`);  // visualizzo la struttura dei campi immessi dall'biglietto 

    // definisco la strsql per lettura biglietto

    let strsql_Inqu = `select * from t_stato_bigliettos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_taglia_biglietto = req.body.d_stato_taglia_biglietto;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_taglia_bigliettos set
                    d_stato_taglia_biglietto = UPPER'${d_stato_taglia_biglietto}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_bigliettos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato taglia iglietto id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Stato taglia aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato biglietto id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato biglietto presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica stato biglietto id ${id}`);  // visualizzo la struttura dei campi immessi dall'biglietto 

  // definisco la strsql per lettura biglietto

    let strsql_Inqu = `select * from t_stato_bigliettos where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_biglietto: req.body.d_stato_biglietto,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_bigliettos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_bigliettos SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato biglietto id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato biglietto aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato biglietto id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato biglietto presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione ruolo

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione stato biglietto id ${id}`);  // visualizzo la struttura dei campi immessi dall'biglietto 

    // definisco la strsql per lettura biglietto

    let strsql_Inqu = `select * from t_stato_bigliettos where id= ${id} `;

    let strsql =  `delete from t_stato_bigliettos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_bigliettos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato biglietto id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato biglietto  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato biglietto id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato biglietto presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

