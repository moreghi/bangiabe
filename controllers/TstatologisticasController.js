// creo i metodi per la gestione dell'logistica

const db = require('../db');
let strSql = 'select * from t_stato_logisticas';

exports.getAll = (req,res)=> {
     
    let strsql = strSql;
    console.log('tstatologistica - ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_logisticas');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati logistica ' + result.length);  

            console.log(`rilevati ${result.length} stati logistica `)
            res.send({
                message:'Situazione attuale stati logistica',
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
            console.log(err,'errore il lettura t_stato_logisticas for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati logistica `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati logistica`,
                message:`situazione attuale per stato id: .....  ${id}`,
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
    
    //  console.log(req.body,'Creazione nuovo logistica');  // visualizzo la struttura dei campi immessi dall'logistica 
  
      // creo le variabili dai campi di input
    
      let d_stato_logistica = req.body.d_stato_logistica;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      let strsql =  `insert into t_stato_logisticas
                  (id,d_stato_logistica,key_utenti_operation) 
                  valueS
                  (
                    ${id},UPPER('${d_stato_logistica}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato logistica su tabella t_stato_logisticas ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
                  res.send({
                  message: `Stato logistica inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Stato logistica id ${id}`);  // visualizzo la struttura dei campi immessi dall'logistica 

    // definisco la strsql per lettura logistica

    let strsql_Inqu = `select * from t_stato_logisticas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_logistica = req.body.d_stato_logistica;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_logisticas set
                    d_stato_logistica = UPPER('${d_stato_logistica}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_logisticas for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato logistica id: ${id}`);
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
                    console.log(`----- inesistente stato logistica id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato logistica presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato logistica id ${id}`);  // visualizzo la struttura dei campi immessi dall'logistica 

  // definisco la strsql per lettura logistica

    let strsql_Inqu = `select * from t_stato_logisticas where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_logistica: req.body.d_stato_logistica,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_logisticas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_logisticas SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato logistica id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato logistica aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato logistica id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato logistica presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione stato logistica id ${id}`);  // visualizzo la struttura dei campi immessi dall'logistica 

    // definisco la strsql per lettura logistica

    let strsql_Inqu = `select * from t_stato_logisticas where id= ${id} `;

    let strsql =  `delete from t_stato_logisticas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_logisticas for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato logistica id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato logistica  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato logistica id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato logistica presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


