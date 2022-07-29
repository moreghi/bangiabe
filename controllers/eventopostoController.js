const strSql = 'select `eventopostos`.* ' +  
                ' FROM `eventopostos` '; 
             
const order =  ' order by `eventopostos`.`idSettore` asc, `eventopostos`.`idFila` asc, `eventopostos`.`idPosto` asc';


const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql + order; // 'select * from eventopostos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all eventopostos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i posti per  evento ' + result.length);  

            console.log(`rilevati ${result.length} evento `)
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
    
    const strsql = strSql + ' where `eventopostos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from eventopostos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura eventopostos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura eventopostos for id ${id}- errore: ${err}`,
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
      let keyuserpren = req.body.keyuserpren;
      let idSettore = req.body.idSettore;
      let idFila = req.body.idFila;
      let idPosto = req.body.idPosto;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let cellulare = req.body.cellulare;
      let email = req.body.email;
      let key_utenti_operation = req.body.key_utenti_operation;
          console.log('backend ------------ eventoposto-------------------- Creazione nuovo evento ' + req.body.data );

      let strsql =  `insert into eventopostos
                  (idEvento,keyuserpren,idSettore,idFila,idPosto,cognome,nome,cellulare,email,key_utenti_operation) 
                  valueS
                  (
                    ${idEvento},'${keyuserpren}',${idSettore},${idFila},${idPosto},UPPER('${cognome}'),UPPER('${nome}'),'${cellulare}',LOWER('${email}'),${key_utenti_operation} 
                  )`;
      
                 
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo posto su tabella eventopostos ');
              res.status(500).send({
                message: `errore in registrazione nuovo posto su tabella eventopostos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... posto inserita regolarmente `);
          res.status(200).send({
            message: `posto inserito regolarmente`,
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

    let strsql_Inqu = `select * from eventopostos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

  
    
   
    let stato = req.body.stato;
    let keyuserpren = req.body.keyuserpren;
    let idlogistica = req.body.idlogistica;
    let idEvento = req.body.idEvento;
    let idSettore = req.body.idSettore;
    let idFila = req.body.idFila;
    let idPosto = req.body.idPosto;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let cellulare = req.body.cellulare;
    let email = req.body.email; 
    let tipobiglietto = req.body.tipobiglietto; 
    let idbiglietto = req.body.idbiglietto;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update eventopostos set
                    stato = ${stato},
                    keyuserpren = '${keyuserpren}',
                    idlogistica = ${idlogistica},
                    idEvento = ${idEvento},
                    idSettore = ${idSettore},
                    idFila = ${idFila},
                    idPosto = ${idPosto},
                    cognome = UPPER('${cognome}'),
                    nome =  UPPER('${nome}'), 
                    cellulare = '${cellulare}',
                    email =  LOWER('${email}'),
                    tipobiglietto = ${tipobiglietto},
                    idbiglietto = ${idbiglietto},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura eventopostos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura eventopostos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento posto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto posto ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato posto id: ${id}`);
                    res.status(200).send({ 
                        message: `posto aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente posto id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun posto presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from eventopostos where id= ${id} `;
    
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
                message: `5 errore il lettura eventopostos for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura eventopostos for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE eventopostos SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
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

    let strsql_Inqu = `select * from eventopostos where id= ${id} `;

    let strsql =  `delete from eventopostos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura eventopostos for key ${id} - errore: ${err}`,
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

    const strsql = strSql + ' where `eventopostos`.`idEvento` = ' + id;

    console.log('getbyevento - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ffss errore il lettura all eventopostos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli evento della manifestazione ' + result.length);  

            console.log(`rilevati ${result.length} evento `)
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


exports.getbyStato = (req,res)=> {
 
    let id = req.params.id;
    let stato = req.params.stato;

    const strsql = strSql + ' where `eventopostos`.`idEvento` = ' + id + ' and `eventopostos`.`stato` = ' + stato;

    console.log('getbyStato - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ffdf errore il lettura all eventopostos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli evento della manifestazione ' + result.length);  

            console.log(`rilevati ${result.length} evento `)
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

exports.getbyIdEventoSettFila = (req,res)=> {
 
    let id = req.params.id;
    let idSett = req.params.idSett;
    let idFila = req.params.idFila;


    const strsql = strSql + ' where `eventopostos`.`idEvento` = ' + id + ' and `eventopostos`.`idSettore` = ' + idSett + '  and  `eventopostos`.`idFila` = ' + idFila;

    console.log('getbyIdEventoSettFila - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ff errore il lettura all eventopostos per settore - fila - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i posti per settore e fila ' + result.length);  

            console.log(`rilevati ${result.length} posti `)
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


exports.getbyIdEventoSettFilaActive = (req,res)=> {
 
    let id = req.params.id;
    let idSett = req.params.idSett;
    let idFila = req.params.idFila;
    let stato = 0;    // posto libero

    const strsql = strSql + ' where `eventopostos`.`idEvento` = ' + id + ' and `eventopostos`.`idSettore` = ' + idSett + '  and  `eventopostos`.`idFila` = ' + idFila + '  and  `eventopostos`.`stato` = ' + stato;

    console.log('getbyIdEventoSettFilaActive - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ff errore il lettura all eventopostos per settore - fila ---- attivi - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i posti per settore e fila --attivi-- ' + result.length);  

            console.log(`rilevati ${result.length} posti `)
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


exports.getbykeyuserpren = (req,res)=> {
 
    let keyuserpren = req.params.keyuserpren;
   
    const strsql = strSql + " where `eventopostos`.`keyuserpren` = '" + keyuserpren + "' ";

    console.log('getbyStato - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `5df errore il lettura all eventopostos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli evento della manifestazione ' + result.length);  

            console.log(`rilevati ${result.length} evento `)
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

exports.getbyIdEventoSettFilaposto = (req,res)=> {
 
    let id = req.params.id;
    let idSett = req.params.idSett;
    let idFila = req.params.idFila;
    let posto = req.params.posto;


    const strsql = strSql + ' where `eventopostos`.`idEvento` = ' + id + ' and `eventopostos`.`idSettore` = ' + idSett + '  and  `eventopostos`.`idFila` = ' + idFila + '  and  `eventopostos`.`idPosto` = ' + posto;

    console.log('getbyIdEventoSettFila - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ff errore il lettura all eventopostos per settore - fila/posto - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i posti per settore e fila/posto ' + result.length);  

            console.log(`rilevati ${result.length} posti `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result[0]
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
