const strSql = 'select `bigliettos`.* , `t_stato_bigliettos`.`d_stato_biglietto`, `t_tipo_bigliettos`.* ' +  
                ' FROM `bigliettos` ' + 
                ' inner join `t_stato_bigliettos` ON `t_stato_bigliettos`.`id` = `bigliettos`.`stato` ' + 
                ' inner join `t_tipo_bigliettos` ON `t_tipo_bigliettos`.`id` = `bigliettos`.`tipo` '; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from bigliettos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all bigliettos - erro: ${err}`,
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
    
    const strsql = strSql + ' where `bigliettos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from bigliettos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura bigliettos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura bigliettos for id ${id}- errore: ${err}`,
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
    

      
      let evento = req.body.evento;
      let idprenotazione = req.body.idprenotazione;
      let stato = req.body.stato;
      let tipo = req.body.tipo;
      let numero = req.body.numero;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let cellulare = req.body.cellulare;
      let datapre = req.body.datapre;
      let dataconf = req.body.dataconf;
      let dataemi = req.body.dataemi;   
      let settore = req.body.settore;
      let fila = req.body.fila;
      let posto = req.body.posto;
      let modpag = req.body.modpag;
      let key_utenti_operation = req.body.key_utenti_operation;
    

      console.log('backend ------------ Biglietto ---------------------- Creazione nuovo biglietto ' + req.body.data );


      let strsql =  `insert into bigliettos
                  (evento,idprenotazione,stato,tipo,numero,cognome,nome,email,cellulare,datapre,dataconf,dataemi,settore,fila,posto,modpag,key_utenti_operation) 
                  valueS
                  (
                    ${evento},${idprenotazione},${stato},${tipo},${numero},UPPER('${cognome}'),UPPER('${nome}'),'${email}','${cellulare}','${datapre}','${dataconf}','${dataemi}',${settore},${fila},${posto},${modpag},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova biglietto su tabella bigliettos ');
              res.status(500).send({
                message: `errore in registrazione nuova evento su tabella bigliettos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... biglietto inserita regolarmente `);
          res.status(200).send({
            message: `biglietto inserito regolarmente`,
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

    let strsql_Inqu = `select * from bigliettos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let evento = req.body.evento;
    let idprenotazione = req.body.idprenotazione;
    let stato = req.body.stato;
    let tipo = req.body.tipo;
    let numero = req.body.numero;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let email = req.body.email;
    let cellulare = req.body.cellulare;
    let datapre = req.body.datapre;
    let dataconf = req.body.dataconf;
    let dataemi = req.body.dataemi;   
    let settore = req.body.settore;
    let fila = req.body.fila;
    let posto = req.body.posto;
    let modpag = req.body.modpag;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update bigliettos set
                    evento = ${evento},
                    idprenotazione = ${idprenotazione},
                    stato = ${stato},
                    tipo = ${tipo},
                    numero = ${numero},
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    email = LOWER('${email}'),
                    cellulare = '${cellulare}',  
                    datapre = '${datapre}',    
                    dataconf = '${dataconf}',   
                    dataemi = '${dataemi}',  
                    settore = ${settore},
                    fila = ${fila},
                    posto = ${posto},
                    modpag = ${modpag},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura bigliettos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura bigliettos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento biglietto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto biglietto ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato biglietto id: ${id}`);
                    res.status(200).send({ 
                        message: `biglietto aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente biglietto id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun  biglietto presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from bigliettos where id= ${id} `;
    
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
                message: `5 errore il lettura bigliettos for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura bigliettos for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE bigliettos SET ? WHERE id = ' + req.params.id, eventonew,(err,result) => {    
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

    let strsql_Inqu = `select * from bigliettos where id= ${id} `;

    let strsql =  `delete from bigliettos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura bigliettos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione biglietto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione biglietto -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `biglietto  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente biglietto id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun biglietto presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getlastId = (req,res)=> {
    
    let id = 9999;
    
    const strsql = 'select `bigliettos`.* FROM `bigliettos` where `bigliettos`.`id` < ' + id + ' order by `bigliettos`.`id` desc';

    console.log('backend - getlastId - strsql --> ' + strsql);
  
   // let strsql = `select * from bigliettos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura bigliettos getlastId ' + id);

            res.status(500).send({
                message: `2 errore il lettura bigliettos getlastId - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  -------------- lastid `)
            console.log('ultimo id ' + result[0].id);
            res.status(200).send({ 
                message:`situazione attuale per getlastId ultimo numero rilevato: ${result[0].id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente`);
            res.status(200).send({
                message: `nessun evento presente `,
                rc: 'nf',
                data:null
            });
        }

    });  
}
