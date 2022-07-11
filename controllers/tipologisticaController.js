const strSql = 'select `t_tipo_logisticas`.*' +
                ' FROM `t_tipo_logisticas` '

const db = require('../db');



// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from t_tipo_logisticas';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all t_tipo_logisticas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i t_tipo_logistica ' + result.length);  

            console.log(`rilevati ${result.length} t_tipo_logistica `)
            res.status(200).send({ 
                message:'Situazione attuale t_tipo_logistica',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun t_tipo_logistica presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo t_tipo_logisticao
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `t_tipo_logisticas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from t_tipo_logisticas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura t_tipo_logisticas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura t_tipo_logisticas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   t_tipo_logistica `)

            res.status(200).send({ 
                message:`situazione attuale per t_tipo_logisticao id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun t_tipo_logisticao presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


// creazione nuovo t_tipo_logisticao   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo t_tipo_logisticao');  // visualizzo la struttura dei campi immessi dall't_tipo_logisticao 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_tipo_logistica = req.body.d_tipo_logistica;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  
      let strsql =  `insert into t_tipo_logisticas
                  (id,d_tipo_logistica,key_utenti_operation) 
                  valueS
                  (
                     ${id},'${d_tipo_logistica}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo t_tipo_logistica su tabella t_tipo_logisticas ');
              res.status(500).send({
                message: `errore in registrazione nuovo t_tipo_logistica su tabella t_tipo_logisticas - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... t_tipo_logisticao inserito regolarmente `);
          res.status(200).send({
            message: `t_tipo_logistica inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento t_tipo_logisticao   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica t_tipo_logisticao id ${id}`);  // visualizzo la struttura dei campi immessi dall't_tipo_logisticao 

    // definisco la strsql per lettura t_tipo_logisticao

    let strsql_Inqu = `select * from t_tipo_logisticas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_tipo_logistica = req.body.d_tipo_logistica;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update t_tipo_logisticas set
                    d_tipo_logistica = '${d_tipo_logistica}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura t_tipo_logisticas for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura t_tipo_logisticas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento t_tipo_logisticao id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto t_tipo_logisticao ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato t_tipo_logisticao id: ${id}`);
                    res.status(200).send({ 
                        message: `t_tipo_logisticao aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente t_tipo_logisticao id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun t_tipo_logisticao pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento t_tipo_logisticao   // metodo 1  -- funziona

exports.updatet_tipo_logisticaoByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica t_tipo_logisticao id ${id}`);  // visualizzo la struttura dei campi immessi dall't_tipo_logisticao 

  // definisco la strsql per lettura t_tipo_logisticao

    let strsql_Inqu = `select * from t_tipo_logisticas where id= ${id} `;
    
    // definisco 
   let t_tipo_logisticaonew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            t_tipo_logisticaoname: req.body.t_tipo_logisticaoname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notet_tipo_logisticao: req.body.notet_tipo_logisticao,
            key_t_tipo_logistica_operation: req.body.key_t_tipo_logistica_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura t_tipo_logisticas for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura t_tipo_logisticas for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_tipo_logisticas SET ? WHERE id = ' + req.params.id, t_tipo_logisticaonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento t_tipo_logisticao id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto t_tipo_logisticao ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `t_tipo_logisticao aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente t_tipo_logisticao id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun t_tipo_logisticao pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione t_tipo_logisticao

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione t_tipo_logistica id ${id}`);  // visualizzo la struttura dei campi immessi dall't_tipo_logisticao 

    // definisco la strsql per lettura t_tipo_logisticao

    let strsql_Inqu = `select * from t_tipo_logisticas where id= ${id} `;

    let strsql =  `delete from t_tipo_logisticas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura t_tipo_logisticas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione t_tipo_logisticao id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione t_tipo_logisticao -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `t_tipo_logisticao  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente t_tipo_logisticao id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun t_tipo_logisticao pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  




