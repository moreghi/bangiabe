const strSql = 'select `t_taglia_bigliettos`.* , `t_stato_taglia_bigliettos`.`d_stato_taglia_biglietto` ' +  
                ' FROM `t_taglia_bigliettos` ' + 
                ' inner join `t_stato_taglia_bigliettos` ON `t_stato_taglia_bigliettos`.`id` = `t_taglia_bigliettos`.`stato` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from t_taglia_bigliettos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all t_taglia_bigliettos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i tagli ' + result.length);  

            console.log(`rilevati ${result.length} eventi `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun taglio presente `,
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
    
    const strsql = strSql + ' where `t_taglia_bigliettos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from t_taglia_bigliettos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura t_taglia_bigliettos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura t_taglia_bigliettos for id ${id}- errore: ${err}`,
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
                message: `nessun taglio presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo evento   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo evento');  // visualizzo la struttura dei campi immessi dall'evento 
  

      // creo le variabili dai campi di input
      let d_taglia = req.body.d_taglia;
      let key_utenti_operation = req.body.key_utenti_operation;
      
      let strsql =  `insert into t_taglia_bigliettos
                  (d_taglia,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${d_taglia}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova taglia su tabella t_taglia_bigliettos ');
              res.status(500).send({
                message: `errore in registrazione nuova taglia su tabella t_taglia_bigliettos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... taglia inserita regolarmente `);
          res.status(200).send({
            message: `taglia inserita regolarmente`,
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

    let strsql_Inqu = `select * from t_taglia_bigliettos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_taglia = req.body.d_taglia;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update t_taglia_bigliettos set
                    d_taglia = UPPER('${d_taglia}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura t_taglia_bigliettos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura t_taglia_bigliettos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto taglia ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata eventoevento id: ${id}`);
                    res.status(200).send({ 
                        message: `taglia aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente taglia id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna taglia presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from t_taglia_bigliettos where id= ${id} `;
    
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
                message: `5 errore il lettura t_taglia_bigliettos for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura t_taglia_bigliettos for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_taglia_bigliettos SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
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

    let strsql_Inqu = `select * from t_taglia_bigliettos where id= ${id} `;

    let strsql =  `delete from t_taglia_bigliettos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura t_taglia_bigliettos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione taglia id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione taglia -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `taglia  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente taglia id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna taglia presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  





