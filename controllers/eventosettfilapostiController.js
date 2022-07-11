const strSql = 'select `eventosettfilapostis`.* , `t_stato_evento_postos`.`d_stato_evento_posto` ' +  
                ' FROM `eventosettfilapostis` ' + 
                ' inner join `t_stato_evento_postos` ON `t_stato_evento_postos`.`id` = `eventosettfilapostis`.`stato` '; 
const order =  ' order by `eventosettfilapostis`.`idSettore` asc, `eventosettfilapostis`.`idFila` asc';




const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql + order; // 'select * from eventosettfilapostis';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all eventosettfilapostis - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i settposti per  eventi ' + result.length);  

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
    
    const strsql = strSql + ' where `eventosettfilapostis`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from eventosettfilapostis where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura eventosettfilapostis for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura eventosettfilapostis for id ${id}- errore: ${err}`,
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
      let idEvento = req.body.idEvento;
      let idLogistica = req.body.idLogistica;
      let idSettore = req.body.idSettore;
      let idFila = req.body.idFila;
      let postoStart = req.body.postoStart;
      let postoEnd = req.body.postoEnd;
      let key_utenti_operation = req.body.key_utenti_operation;
      

      console.log('backend ------------ eventosettfilaposti-------------------- Creazione nuovo evento ' + req.body.data );

      let strsql =  `insert into eventosettfilapostis
                  (idEvento,idLogistica,idSettore,idFila,postoStart,postoEnd,key_utenti_operation) 
                  valueS
                  (
                    ${idEvento},${idLogistica},${idSettore},${idFila},${postoStart},${postoEnd},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova evento su tabella eventosettfilapostis ');
              res.status(500).send({
                message: `errore in registrazione nuova evento su tabella eventosettfilapostis - errore: ${err}`,
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

    let strsql_Inqu = `select * from eventosettfilapostis where id= ${id} `;

    // definisco le variabili per aggiornamento campi

   
    let stato = req.body.stato;
    let idEvento = req.body.idEvento;
    let idLogistica = req.body.idLogistica;
    let idSettore = req.body.idSettore;
    let idFila = req.body.idFila;
    let postoStart = req.body.postoStart;
    let postoEnd = req.body.postoEnd;
    let utilizzo = req.body.utilizzo;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update eventosettfilapostis set
                    stato = ${stato},
                    idEvento = ${idEvento},
                    idLogistica = ${idLogistica},
                    idSettore = ${idSettore},
                    idFila = ${idFila},
                    postoStart = ${postoStart},
                    postoEnd = ${postoEnd},
                    utilizzo =  UPPER('${utilizzo}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura eventosettfilapostis for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura eventosettfilapostis for key ${id} - errore: ${err}`,
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

    let strsql_Inqu = `select * from eventosettfilapostis where id= ${id} `;
    
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
                message: `5 errore il lettura eventosettfilapostis for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura eventosettfilapostis for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE eventosettfilapostis SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
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

    let strsql_Inqu = `select * from eventosettfilapostis where id= ${id} `;

    let strsql =  `delete from eventosettfilapostis  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura eventosettfilapostis for key ${id} - errore: ${err}`,
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


exports.getbyevento = (req,res)=> {
 
    let id = req.params.id;

    const strsql = strSql + ' where `eventosettfilapostis`.`idEvento` = ' + id;

    console.log('getbyevento - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ff errore il lettura all eventosettfilapostis - erro: ${err}`,
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

exports.getCountbysettfila = (req,res)=> {




    console.log('backend -----------------------------  getCountbysettfila ' + JSON.stringify(req.params));
    
    let id = req.params.id;
  
    let totale = 0;
    let totaleko = 0;
    let totaleok = 0;
    let settok = 0;
    let settko = 1;
    
    let num = 0;
    let numok = 0;
    let numko = 0;
   
    let strsql = 'SELECT COUNT(id) as settfila from  `eventosettfilapostis` where `eventosettfilapostis`.`idEvento` = ' + id;
    let strsql1 = 'SELECT COUNT(id) as nok from  `eventosettfilapostis` where `eventosettfilapostis`.`idEvento` = ' + id + ' and `eventosettfilapostis`.`stato` = ' + settok;
    let strsql2 = 'SELECT COUNT(id) as nko from  `eventosettfilapostis` where `eventosettfilapostis`.`idEvento` = ' + id + ' and `eventosettfilapostis`.`stato` = ' + settko;
   
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
            res.status(500).JSON.send({
                 message: `3xwq errore in lettura conteggi all eventosettfilapostis per settore/fila - erro: ${err.JSON}`,
                 data:null
             });
             return;
         }
         if(result.length>0) {
            totale = result[0].settfila;
            if(totale == 0) {
                console.log('--------------   per id ' + id + ' non trovati movimenti ');
                res.status(200).send({ 
                    message:'non presenti settore/file - errore grave',
                    rc: 'ko',
                    idevento:id,
                    totale:0,
                    totaleok:0,
                    totaleko:0
                 });
                return;
            } else {
                db.query(strsql1,(err,result)=> {
                    if(err) {
                        res.status(500).send({
                            message: `3xwq errore in lettura conteggi all eventosettfilapostis per settore/fila - erro: ${err}`,
                            data:null
                        });
                        return;
                    } 
                    console.log('result.length-ok ' + result.length)
                    if(result.length>0) {
                        totaleok = result[0].nok;
                        console.log('trovati ok: ' + totaleok);
                    } else {
                        totaleok = 0;  
                     }
                     db.query(strsql2,(err,result)=> {
                        if(err) {
                            res.status(500).send({
                                message: `3xwq errore in lettura conteggi all eventosettfilapostis per settore/fila - erro: ${err}`,
                                data:null
                            });
                            return;
                        } 
                        console.log('result.length-ok ' + result.length)
                        if(result.length>0) {
                            totaleko = result[0].nko;
                            console.log('trovati ko: ' + totaleko);
                        } else {
                            totaleko = 0;  
                         }
console.log('prima di send finale');
console.log('totale: ' + totale);
console.log('totaleok: ' + totaleok);
console.log('totaleko: ' + totaleko);

                         res.status(200).send({ 
                            message:'Situazione attuale settore/file ok 3',
                            rc: 'ok',
                            idevento: id,
                            tot: totale,
                            totok: totaleok,
                            totko: totaleko
                        });              
                     });
                     
                 });

                
            }
        } 
    });

 
}

/*

    exports.getCountbysettfilacopia = (req,res)=> {

        console.log('backend -----------------------------  getCountbysettfila ' + JSON.stringify(req.params));
        
        let id = req.params.id;
      
        let totale = 0;
        let totaleko = 0;
        let totaleok = 0;
        let settok = 0;
        let settko = 1;
        
        let num = 0;
        let numok = 0;
        let numko = 0;
       
        let strsql = 'SELECT COUNT(id) as settfila from  `eventosettfilapostis` where `eventosettfilapostis`.`idEvento` = ' + id;
        let strsql1 = 'SELECT COUNT(id) as nok from  `eventosettfilapostis` where `eventosettfilapostis`.`idEvento` = ' + id + ' and `eventosettfilapostis`.`stato` = ' + settok;
        let strsql2 = 'SELECT COUNT(id) as nko from  `eventosettfilapostis` where `eventosettfilapostis`.`idEvento` = ' + id + ' and `eventosettfilapostis`.`stato` = ' + settko;
       
        console.log(`strsql:  ${strsql} `);
       // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
       // query 1
        db.query(strsql,(err,result)=> {
            if(err) {
                res.status(500).JSON.send({
                     message: `3xwq errore in lettura conteggi all eventosettfilapostis per settore/fila - erro: ${err.JSON}`,
                     data:null
                 });
                 return;
              }
              if(result.length>0) {
                totale = result[0].settfila;
                if(totale == 0) {
                    console.log('--------------   per id ' + id + ' non trovati movimenti ');
                    res.status(200).send({ 
                        message:'non presenti settore/file - errore grave',
                        rc: 'ko',
                        idevento:id,
                        totale:0,
                        totaleok:0,
                        totaleko:0
                     });
                    return;
                  }
                }

            });

// query 2
db.query(strsql1,(err,result)=> {
    if(err) {
        res.status(500).JSON.send({
             message: `3xwq errore in lettura conteggi all eventosettfilapostis per settore/fila - erro: ${err.JSON}`,
             data:null
         });
         return;
     }
     if(result.length>0) {
       totaleok = result[0].nok;
                console.log('trovati ok: ' + totaleok);
       } else {
                totaleok = 0;  
       }

});
// query 2
db.query(strsql2,(err,result)=> {
    if(err) {
        res.status(500).JSON.send({
             message: `3xwq errore in lettura conteggi all eventosettfilapostis per settore/fila - erro: ${err.JSON}`,
             data:null
         });
         return;
     }
     if(result.length>0) {
        totaleko = result[0].nko;
        console.log('trovati ko: ' + totaleko);
    } else {
        totaleko = 0;  
     }
});

res.status(200).send({ 
    message:'Situazione attuale settore/file ok 3',
    rc: 'ok',
    idevento: id,
    tot: totale,
    totok: totaleok,
    totko: totaleko
});              

    }


*/




