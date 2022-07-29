const strSql = 'select `cassamovs`.* , `t_stato_cassamovs`.`d_stato_cassamov` ' +  
                ' FROM `cassamovs` ' + 
                ' inner join `t_stato_cassamovs` ON `t_stato_cassamovs`.`id` = `cassamovs`.`stato` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from cassamovs';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassamovs - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti movimenti di cassa ' + result.length);  

            console.log(`rilevati ${result.length} movimenti di cassa `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun movimento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo cassamov
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `cassamovs`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura cassamovs for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura cassamovs for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)

            res.status(200).send({ 
                message:`situazione attuale per cassamov id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun record cassamov presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo cassamov   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo cassamov');  // visualizzo la struttura dei campi immessi dall'cassamov 
  
      // creo le variabili dai campi di input
 

      let idcassa = req.body.idcassa;
      let idevento = req.body.idevento;
      let idbiglietto = req.body.idbiglietto;
      let importo = req.body.importo;
      let stato = req.body.stato;
      let modpag = req.body.modpag;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      console.log('backend ------------ cassamov ---------------------- Creazione nuovo cassamov ' + req.body.data );


      let strsql =  `insert into cassamovs
                  (idcassa,idevento,idbiglietto,stato,importo,modpag,cognome,nome,key_utenti_operation) 
                  valueS
                  (
                   ${idcassa},${idevento},${idbiglietto},${stato},${importo},${modpag},UPPER('${cognome}'),UPPER('${nome}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo movimento cassa su tabella cassamovs ');
              res.status(500).send({
                message: `errore in registrazione nuovo movimento cassa su tabella cassamovs - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... movimento cassa inserito regolarmente `);
          res.status(200).send({
            message: `movimento cassa inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento cassamov   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica cassamov id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassamov 

    // definisco la strsql per lettura cassamov

    let strsql_Inqu = `select * from cassamovs where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idcassa = req.body.idcassa;
    let idevento = req.body.idevento;
    let idbiglietto = req.body.idbiglietto;
    let importo = req.body.importo;
    let stato = req.body.stato;
    let modpag = req.body.modpag;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let key_utenti_operation = req.body.key_utenti_operation;
      
    let strsql =  `update cassamovs set
                    idcassa = ${idcassa},
                    idevento = ${idevento},
                    idbiglietto = ${idbiglietto},
                    importo = ${importo},
                    stato = ${stato},
                    modpag = ${modpag},
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura movimento cassa for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura movimento cassa for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento movimento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto movimento cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato moviemnto cassa id: ${id}`);
                    res.status(200).send({ 
                        message: `moviemnto cassa aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente movimento cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun movimento cassa presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento cassamov   // metodo 1  -- funziona

exports.updatecassamovByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica cassamov id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassamov 

  // definisco la strsql per lettura cassamov

    let strsql_Inqu = `select * from cassamovs where id= ${id} `;
    
    // definisco 
   let cassamovnew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            cassamovname: req.body.cassamovname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notecassamov: req.body.notecassamov,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura cassamovs for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura cassamovs for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE cassamovs SET ? WHERE id = ' + req.params.id, cassamovnew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassamov id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassamov ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `cassamov aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente cassamov id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassamov pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione cassamov

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione cassamov id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassamov 

    // definisco la strsql per lettura cassamov

    let strsql_Inqu = `select * from cassamovs where id= ${id} `;

    let strsql =  `delete from cassamovs  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassamovs for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassamov id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassamov -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassamov  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassamov id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassamov presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



exports.getAllbyCassa = (req,res)=> {
    
    let idcassa = req.params.id;
    
    const strsql = strSql + ' where `cassamovs`.`idcassa` = ' + idcassa;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2ggg errore il lettura cassamovs for id ' + idcassa);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idcassa}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)

            res.status(200).send({ 
                message:`situazione attuale per cassamov idcassa: .....  ${idcassa}`,
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idcassa: ${idcassa} `);
            res.status(200).send({
                message: `nessun record cassamov presente for idcassa: ${idcassa}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}
