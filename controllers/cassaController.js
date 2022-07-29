const strSql = 'select `cassas`.* , `t_stato_cassas`.`d_stato_cassa` ' +  
                ' FROM `cassas` ' + 
                ' inner join `t_stato_cassas` ON `t_stato_cassas`.`id` = `cassas`.`stato` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from cassas';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le casse ' + result.length);  

            console.log(`rilevati ${result.length} casse `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun cassa presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo cassa
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `cassas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura cassas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura cassas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per cassa id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun record cassa presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo cassa   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo cassa');  // visualizzo la struttura dei campi immessi dall'cassa 
  
      // creo le variabili dai campi di input
    
            
      let datacassa = req.body.datacassa;
      let stato = req.body.stato;
      let importo = req.body.importo;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      console.log('backend ------------ Biglietto ---------------------- Creazione nuovo cassa ' + req.body.data );


      let strsql =  `insert into cassas
                  (datacassa,stato,importo,key_utenti_operation) 
                  valueS
                  (
                   '${datacassa}',${stato},${importo},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova cassa su tabella cassas ');
              res.status(500).send({
                message: `errore in registrazione nuova cassa su tabella cassas - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... cassa inserita regolarmente `);
          res.status(200).send({
            message: `cassa inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento cassa   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

    // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let datacassa = req.body.datacassa;
    let stato = req.body.stato;
    let importo = req.body.importo;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update cassas set
                    datacassa = '${datacassa}',
                    stato = ${stato},
                    importo = ${importo},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura cassas for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura cassas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata cassa id: ${id}`);
                    res.status(200).send({ 
                        message: `cassa aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassa presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento cassa   // metodo 1  -- funziona

exports.updatecassaByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

  // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassas where id= ${id} `;
    
    // definisco 
   let cassanew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            cassaname: req.body.cassaname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notecassa: req.body.notecassa,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura cassas for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura cassas for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE cassas SET ? WHERE id = ' + req.params.id, cassanew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `cassa aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassa pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione cassa

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

    // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassas where id= ${id} `;

    let strsql =  `delete from cassas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassa -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassa  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassa presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getbydata = (req,res)=> {
    
    let datacassa = req.params.datacassa;
    
    const strsql = strSql + " where `cassas`.`datacassa` = '" + datacassa + "' ";

    console.log('backend - --------- Cassa --------------------------- getbydata - strsql --> ' + strsql);
  
   // let strsql = `select * from cassas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rw errore il lettura cassas for datacassa ' + datacassa);

            res.status(500).send({
                message: `2 errore il lettura cassas for datacassa ${datacassa}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per cassa datacassa: .....  ${datacassa}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per datacassa: ${datacassa} `);
            res.status(200).send({
                message: `nessun record cassa presente for datacassa: ${datacassa}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getlastdata = (req,res)=> {
    
    let id = 9999;
    
    const strsql = strSql + " where `cassas`.`id` <= " + id + " order by id desc ";

    console.log('backend - getlastdata - strsql --> ' + strsql);
  
   // let strsql = `select * from cassas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rw errore il lettura ultima cassa ');

            res.status(500).send({
                message: `2 errore il lettura cassas for ultima cassa - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per ultima cassa`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente `);
            res.status(200).send({
                message: `nessun record cassa presente `,
                rc: 'nf',
                data:null
            });
        }

    });  
}






