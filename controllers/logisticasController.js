const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select `logisticas`.`*`, `t_stato_logisticas`.`d_stato_logistica` ' +  
               ' from `logisticas`  ' + 
               ' inner join `t_stato_logisticas` ON `t_stato_logisticas`.`id` = `logisticas`.`stato` '; 
const order =  ' order by `logisticas`.`id` asc';


exports.getAll = (req,res)=> {
 
    let strsql = strSql + order;

    console.log('backend - Logistica -- strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all logisticas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le Logistiche ' + result.length);  

            console.log(`rilevate ${result.length} Logistiche `)
            res.status(200).send({ 
                message:'Situazione attuale Logistiche',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

// lettura singola Logistica
exports.getbyid = (req,res)=> {
    
    const id = req.params.id;
    
    let strsql = strSql + ' where `logisticas`.`id` = ' + id;

   
    console.log('backend - Logistica getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura logisticas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura logisticas for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   Logistiche `)

            res.status(200).send({ 
                message:`situazione attuale per Logistica id: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura singola Logistica
exports.getbystato = (req,res)=> {
    
    const stato = req.params.stato;
    
    let strsql = strSql + ' where `logisticas`.`stato` = ' + stato + order;

    console.log('backend - getbystato - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura logisticas for stato' + stato);

            res.status(500).send({
                message: `3 errore il lettura logisticas for stato ${stato}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   Logistiche `)

            res.status(200).send({ 
                message:`situazione attuale per Logistica stato: .....  ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessuna Logistica presente per la selezione impostata`,
                number:  result.length,
                rc: 'nf',
                data:result
            });
        }

    });  
}




// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let localita = req.body.localita;
      let luogo = req.body.luogo;
      let photo = req.body.photo;
      let key_utenti_operation = req.body.key_utenti_operation;
       
      let strsql =  `insert into logisticas
                  (localita,luogo,photo,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${localita}'),'${luogo}','${photo}',${key_utenti_operation} 
                  )`;
      console.log('insert - strsql: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova Logistica su tabella logisticas ');
              res.status(500).send({
                message: `errore in registrazione nuova Logistica su tabella logisticas - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Logistica inserita regolarmente `);
          res.status(200).send({
            message: `Logistica inserita regolarmente`,
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from logisticas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let localita = req.body.localita;
    let luogo = req.body.luogo;
    let photo = req.body.photo;
    let stato = req.body.stato;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update logisticas set
                    localita = UPPER('${localita}'),
                    luogo = '${luogo}',
                    photo = '${photo}',
                    stato = ${stato},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;


                    console.log('bk - --------------  Logistica ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura logisticas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura logisticas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Logistica id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Logistica ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Logistica id: ${id}`);
                    res.status(200).send({ 
                        message: `Logistica aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente Logistica id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Logistica presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona   (da sistemare)  usata solo come esempio
// da sistremare nei campi
exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica Logistica id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from logisticas where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            noteLogistica: req.body.noteLogistica,
            key_utenti_operation: req.body.key_utenti_operation
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura users for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE logisticas SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Logistica ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Logistica aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente Logistica id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Logistica pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione Logistica

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione Logistica id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from logisticas where id= ${id} `;

    let strsql =  `delete from logisticas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura logisticas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione Logistica id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione Logistica -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Logistica  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente Logistica id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getAllActive = (req,res)=> {
 
    let stato = 2;
    let strsql = strSql + ' where stato = ' + stato;

    console.log('backend - getAllActive -- strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3ft errore il lettura all logisticas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le Logistiche attive' + result.length);  

            console.log(`rilevate ${result.length} Logistiche `)
            res.status(200).send({ 
                message:'Situazione attuale Logistiche',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna logistica presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}
