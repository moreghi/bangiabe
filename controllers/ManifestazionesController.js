// creo i metodi per la gestione dell'utente

/*
esempio di come creare strsql parametrica          https://dirask.com/posts/Node-js-MySQL-Inner-Join-jPErd1

connection.connect(error => {
    if (error) throw error;
    const query = `SELECT * 
                   FROM ??
                   JOIN ?? ON ??.?? = ??.??`;
    const values = [
        'users',                 // SELECT *
        'departments',           // FROM `users`
        'departments',           // JOIN `departments` 
        'id',                    // ON departments.id = users.department_id
        'users',
        'department_id',
    ];

    connection.query(query, values, (error, result) => {  // sends queries
        connection.end();                                 // closes connection
        if (error) throw error;
        console.log(result);
    });
});


*/

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select `manifestaziones`.`*`, `t_stato_manifestaziones`.`d_stato_manifestazione` ' +  
               ' from `manifestaziones`  ' + 
               ' inner join `t_stato_manifestaziones` ON `t_stato_manifestaziones`.`id` = `manifestaziones`.`stato` '; 
const order =  ' order by `manifestaziones`.`id` desc';


exports.getAll = (req,res)=> {
 
    let strsql = strSql + order;

    console.log('backend - Manifestazione -- strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all manifestaziones - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le manifestazioni ' + result.length);  

            console.log(`rilevate ${result.length} manifestazioni `)
            res.status(200).send({ 
                message:'Situazione attuale Manifestazioni',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

// lettura singola Manifestazione
exports.getbyid = (req,res)=> {
    
    const id = req.params.id;
    
    let strsql = strSql + ' where `manifestaziones`.`id` = ' + id;

   
    console.log('backend - Manifestazione getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura manifestaziones for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura manifestaziones for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   manifestazioni `)

            res.status(200).send({ 
                message:`situazione attuale per manifestazione id: .....  ${id}`,
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

// lettura singola Manifestazione
exports.getbystato = (req,res)=> {
    
    const stato = req.params.stato;
    
    let strsql = strSql + ' where `manifestaziones`.`stato` = ' + stato + order;

    console.log('backend - getbystato - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura manifestaziones for stato' + stato);

            res.status(500).send({
                message: `3 errore il lettura manifestaziones for stato ${stato}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   manifestazioni `)

            res.status(200).send({ 
                message:`situazione attuale per manifestazione stato: .....  ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessuna manifestazione presente per la selezione impostata`,
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
      let descManif = req.body.descManif;
      let anno = req.body.anno;
      let noteManifestazione = req.body.noteManifestazione;
      let key_utenti_operation = req.body.key_utenti_operation;
     /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into manifestaziones
                  (descManif,anno,noteManifestazione,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${descManif}'),${anno},UPPER('${noteManifestazione}'),${key_utenti_operation} 
                  )`;
      console.log('insert - strsql: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova manifestazione su tabella manifestaziones ');
              res.status(500).send({
                message: `errore in registrazione nuova manifestazione su tabella manifestaziones - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Manifestazione inserita regolarmente `);
          res.status(200).send({
            message: `Manifestazione inserita regolarmente`,
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from manifestaziones where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let descManif = req.body.descManif;
    let anno = req.body.anno;
    let dtInizio = req.body.dtInizio;
    let dtFine = req.body.dtFine;
    let stato = req.body.stato;
    let noteManifestazione = req.body.noteManifestazione;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update manifestaziones set
                    descManif = UPPER('${descManif}'),
                    anno = ${anno},
                    dtInizio = '${dtInizio}',
                    dtFine = '${dtFine}',
                    stato = ${stato},
                    noteManifestazione = UPPER('${noteManifestazione}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;


                    console.log('bk - --------------  manifestazione ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura manifestaziones for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura manifestaziones for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento manifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto manifestazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato manifestazione id: ${id}`);
                    res.status(200).send({ 
                        message: `Manifestazione aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente manifestazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifestazione presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica Manifestazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from manifestaziones where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            noteManifestazione: req.body.noteManifestazione,
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
                  db.query('UPDATE manifestaziones SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto manifestazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Manifestazione aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente manifestazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifestazione pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione manifestazione

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione manifestazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from manifestaziones where id= ${id} `;

    let strsql =  `delete from manifestaziones  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura manifestaziones for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione manifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione manifestazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Manifestazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente manifestazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



exports.getrilascio = (req,res)=> {

    console.log('backend -----------------------------  getrilascio ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let neventi = 0;
    let neventiok = 0;
    let neventiko = 0;

    let strsql = '';
    let strsql1 = '';
     
    strsql = 'SELECT COUNT(`eventos`.`idmanif`) as nevent from  `eventos` where `eventos`.`idmanif` = ' + id;
    strsql1 = 'SELECT COUNT(`eventos`.`idmanif`) as neventok from  `eventos` ' +
                 ' where `eventos`.`idmanif` = ' + id + ' and  `eventos`.`stato` = 1';
     
                  console.log('start - id: ' + id + ' strsql: ' + strsql + ' strsql1: ' + strsql1);
db.query(strsql,(err,result)=> {
    if(err) {
        res.status(500).send({
             message: `kuytr errore in lettura conteggi all spese - erro: ${err}`,
             data:null
         });
         return;
     }
     if(result.length>0)  {
        neventi = result[0].nevent;
        db.query(strsql1,(err,result)=> {
            if(err) {
                res.status(500).send({
                     message: `kuytr errore in lettura conteggi all spese - erro: ${err}`,
                     data:null
                 });
                 return;
             }
             if(result.length>0)  {
                neventiok = result[0].neventok;
             }
             if(neventi === neventiok) {
                res.status(200).send({
                    message: `Manifestazione  ${id} rilasciabile. gli eventi sono stati correttamente rilasciati`,
                    nev: neventi,
                    nevok: neventiok,
                    nevko: neventiko,
                    rc: 'ok',
                    data:null
                });
                return;
               } else {
                neventiko = neventi - neventiok;
                res.status(200).send({
                    message: `Manifestazione  ${id} NON rilasciabile. ci sono ${neventiko} eventi non rilasciati`,
                    nev: neventi,
                    nevok: neventiok,
                    nevko: neventiko,
                    rc: 'ko',
                    data:null
                });
                return;
               }
        });
     } else {
        res.status(200).send({
            message: `nessun evento presente per la manifestazione ${id}`,
            rc: 'nf',
            data:null
        });
        return;
     }
});



}

