const strSql = 'select `eventos`.* , `t_stato_eventos`.`d_stato_evento`, `t_stato_evento_bigliettos`.`d_stato_evento_biglietto`, `t_stato_evento_postos`.`d_stato_evento_posto` ' +  
                ' FROM `eventos` ' + 
                ' inner join `t_stato_eventos` ON `t_stato_eventos`.`id` = `eventos`.`stato` ' + 
                ' inner join `t_stato_evento_bigliettos` ON `t_stato_evento_bigliettos`.`id` = `eventos`.`statobiglietti` ' + 
                ' inner join `t_stato_evento_postos` ON `t_stato_evento_postos`.`id` = `eventos`.`statoposti` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from eventos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all eventos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli eventi ' + result.length);  

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
                message: `nessun evento presente `,
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
    
    const strsql = strSql + ' where `eventos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from eventos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura eventos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura eventos for id ${id}- errore: ${err}`,
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
                message: `nessun evento presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo evento   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo evento');  // visualizzo la struttura dei campi immessi dall'evento 
  
      // creo le variabili dai campi di input
      
      let idmanif = req.body.idmanif;
      let idlogistica = req.body.idlogistica;
      let descrizione = req.body.descrizione;
      let stato = req.body.stato;
      let data = req.body.data;
      let ora = req.body.ora;
      let localita = req.body.localita;
      let indirizzo = req.body.indirizzo;
      let cap = req.body.cap;
      let idtipo = req.body.idtipo;   
      let statobiglietti = req.body.statobiglietti;
      let statoposti = req.body.statoposti;
      let nposti = req.body.nposti;
      let key_utenti_operation = req.body.key_utenti_operation;
    

      console.log('backend ------------ evento ---------------------------- Creazione nuovo evento ' + req.body.data );


      let strsql =  `insert into eventos
                  (idmanif,idlogistica,descrizione,stato,data,ora,localita,indirizzo,cap,idtipo,statobiglietti,statoposti,nposti,key_utenti_operation) 
                  valueS
                  (
                    ${idmanif},${idlogistica},UPPER('${descrizione}'),${stato},'${data}','${ora}',UPPER('${localita}'),UPPER('${indirizzo}'),'${cap}',${idtipo},${statobiglietti},${statoposti},${nposti},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova evento su tabella eventos ');
              res.status(500).send({
                message: `errore in registrazione nuova evento su tabella eventos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... evento inserita regolarmente `);
          res.status(200).send({
            message: `evento inserita regolarmente`,
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

    let strsql_Inqu = `select * from eventos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let descrizione = req.body.descrizione;
    let stato = req.body.stato;
    let statobiglietti = req.body.statobiglietti;
    let statoposti = req.body.statoposti;
    let data = req.body.data;
    let ora = req.body.ora;
    let localita = req.body.localita;
    let indirizzo = req.body.indirizzo;
    let cap = req.body.cap;
    let idtipo = req.body.idtipo;   
    let idlogistica = req.body.idlogistica;    
    let d_logistica = req.body.d_logistica;    //  da cancellare
    let photo = req.body.photo;                // da cancellare
    let nposti = req.body.nposti;
    let incassato = req.body.incassato;
    let spese = req.body.spese;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update eventos set
                    descrizione = UPPER('${descrizione}'),
                    stato = ${stato},
                    statobiglietti = ${statobiglietti},
                    statoposti = ${statoposti},
                    data = '${data}',
                    ora = '${ora}',
                    localita = UPPER('${localita}'),
                    indirizzo = UPPER('${indirizzo}'),
                    cap = '${cap}',
                    idtipo = ${idtipo},
                    idlogistica = ${idlogistica},
                    d_logistica = UPPER('${d_logistica}'),
                    photo = '${photo}',
                    nposti = ${nposti},
                    incassato = ${incassato},
                    spese = ${spese},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura eventos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura eventos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto evento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata eventoevento id: ${id}`);
                    res.status(200).send({ 
                        message: `evento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente evento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna evento presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from eventos where id= ${id} `;
    
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
                message: `5 errore il lettura eventos for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura eventos for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE eventos SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
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

    let strsql_Inqu = `select * from eventos where id= ${id} `;

    let strsql =  `delete from eventos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura eventos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione evento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `evento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente evento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna evento presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getbymanif = (req,res)=> {
 
    let id = req.params.id;

    const strsql = strSql + ' where `eventos`.`idmanif` = ' + id;

    console.log('getbymanif - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ff errore il lettura all eventos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli eventi della manifestazione ' + result.length);  

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
                message: `nessun evento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}



exports.getAllActive = (req,res)=> {
 
    let stato = 1;
    
    const strsql = strSql + ' where `eventos`.`stato` = ' + stato;

    
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3dw errore il lettura all eventos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli eventi attivi' + result.length);  

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
                message: `nessun evento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}


exports.getlastid = (req,res)=> {
    
    let id = 99999;
    let order = ' order by `eventos`.`id` desc';
    const strsql = strSql + '  where `eventos`.`id` <= ' + id + order;

    console.log('backend - getlastid - strsql --> ' + strsql);
  
   // let strsql = `select * from elementos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2de errore il lettura eventos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura eventos for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   evento `)

            res.status(200).send({ 
                message:`ultimo evento in tabella `,
                rc: 'ok',
                data:result[0]
            });                    
         }

    });  
}


exports.getActivebymanif = (req,res)=> {
 
    let id = req.params.id;
    let stato = 1;

    const strsql = strSql + ' where `eventos`.`idmanif` = ' + id + ' and `eventos`.`stato` = ' + stato;

    console.log('getbymanif - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3fhttf errore il lettura all eventos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli eventi attivi della manifestazione ' + result.length);  

            console.log(`rilevati ${result.length} eventi Attivi`)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun evento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}