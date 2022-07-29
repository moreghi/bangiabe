// creo i metodi per la gestione dell'utente

const db = require('../db');
let strSql = 'select * from t_stato_bigliettos';

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
                message:`situazione attuale per stato biglietto id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${id} `); 
            res.send({
                message: `nessun stato biglietto presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo stato biglietto   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_biglietto = req.body.d_stato_biglietto;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      let strsql =  `insert into t_stato_bigliettos
                  (id,d_stato_biglietto,key_utenti_operation) 
                  valueS
                  (
                    ${id},UPPER('${d_stato_biglietto}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato biglietto su tabella t_stato_bigliettos ');
          }
          console.log(result, `result ...... stato biglietto inserito regolarmente `);
  
        
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

    console.log(req.body,`Modifica Stato utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_stato_bigliettos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_biglietto = req.body.d_stato_biglietto;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_bigliettos set
                    d_stato_biglietto = UPPER('${d_stato_biglietto}'),
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

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica stato biglietto id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_stato_bigliettos where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_utente: req.body.d_stato_utente,
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

// cancellazione stato biglietto

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione stato biglietto id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

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

