const strSql = 'select `t_tipo_pagamentos`.*  ' +  
                ' FROM `t_tipo_pagamentos` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from t_tipo_pagamentos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all t_tipo_pagamentos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i tipo pagamento ' + result.length);  

            console.log(`rilevati ${result.length} tipo pagamento `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun tipo pagamento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo tipo pagamento
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `t_tipo_pagamentos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from t_tipo_pagamentos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura t_tipo_pagamentos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura t_tipo_pagamentos for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   tipo pagamento `)

            res.status(200).send({ 
                message:`situazione attuale per tipo pagamento id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun tipo pagamento presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo tipo pagamento   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo tipo pagamento');  // visualizzo la struttura dei campi immessi dall'tipo pagamento 
  

      // creo le variabili dai campi di input
      let d_tipo_pagamento = req.body.d_tipo_pagamento;
      let key_utenti_operation = req.body.key_utenti_operation;
      
      let strsql =  `insert into t_tipo_pagamentos
                  (d_tipo_pagamento,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${d_tipo_pagamento}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo tipo pagamento su tabella t_tipo_pagamentos ');
              res.status(500).send({
                message: `errore in registrazione nuovo tipo pagamento su tabella t_tipo_pagamentos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... tipo pagamento inserita regolarmente `);
          res.status(200).send({
            message: `tipo pagamento inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento tipo pagamento   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica tipo pagamento id ${id}`);  // visualizzo la struttura dei campi immessi dall'tipo pagamento 

    // definisco la strsql per lettura tipo pagamento

    let strsql_Inqu = `select * from t_tipo_pagamentos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

   
    let d_tipo_pagamento = req.body.d_tipo_pagamento;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update t_tipo_pagamentos set
                    d_tipo_pagamento = UPPER('${d_tipo_pagamento}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura t_tipo_pagamentos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura t_tipo_pagamentos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento tipo pagamento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto tipo pagamento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata tipo pagamentotipo pagamento id: ${id}`);
                    res.status(200).send({ 
                        message: `tipo pagamento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente tipo pagamento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna tipo pagamento presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento tipo pagamento   // metodo 1  -- funziona



// cancellazione tipo pagamento

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione tipo pagamento id ${id}`);  // visualizzo la struttura dei campi immessi dall'tipo pagamento 

    // definisco la strsql per lettura tipo pagamento

    let strsql_Inqu = `select * from t_tipo_pagamentos where id= ${id} `;

    let strsql =  `delete from t_tipo_pagamentos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura t_tipo_pagamentos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione tipo pagamento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione tipo pagamento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `tipo pagamento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente tipo pagamento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna tipo pagamento presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



