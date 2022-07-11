const strSql = 'select `elementos`.*  FROM `elementos`';


const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from elementos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all elementos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli elementi ' + result.length);  

            console.log(`rilevati ${result.length} elementi `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun elemento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo elemento
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `elementos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from elementos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura elementos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura elementos for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   elemento `)

            res.status(200).send({ 
                message:`situazione attuale per elemento id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun elemento presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo elemento   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo elemento');  // visualizzo la struttura dei campi immessi dall'elemento 
  
      // creo le variabili dai campi di input

      let idsettore = req.body.idsettore;
      let dsettore = req.body.dsettore;
      let delemento = req.body.delemento;
      let key_utenti_operation = req.body.key_utenti_operation;
     

      let strsql =  `insert into elementos
                  (idsettore,dsettore,delemento,key_utenti_operation) 
                  valueS
                  (
                    ${idsettore},UPPER('${dsettore}'),UPPER('${delemento}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova elemento su tabella elementos ');
              res.status(500).send({
                message: `errore in registrazione nuova elemento su tabella elementos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... elemento inserito regolarmente `);
          res.status(200).send({
            message: `elemento inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento elemento   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica elemento id ${id}`);  // visualizzo la struttura dei campi immessi dall'elemento 

    // definisco la strsql per lettura elemento

    let strsql_Inqu = `select * from elementos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idsettore = req.body.idsettore;
    let dsettore = req.body.dsettore;
    let delemento = req.body.delemento;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update elementos set
                    idsettore = ${idsettore},
                    dsettore = UPPER('${dsettore}'),
                    delemento = UPPER('${delemento}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura elementos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura elementos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento elemento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto elemento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata elementoelemento id: ${id}`);
                    res.status(200).send({ 
                        message: `elemento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente elemento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna elemento presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento elemento   // metodo 1  -- funziona

exports.updateelementoByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica elemento id ${id}`);  // visualizzo la struttura dei campi immessi dall'elemento 

  // definisco la strsql per lettura elemento

    let strsql_Inqu = `select * from elementos where id= ${id} `;
    
    // definisco 
   let elementonew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            elementoname: req.body.elementoname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            noteelemento: req.body.noteelemento,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura elementos for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura elementos for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE elementos SET ? WHERE id = ' + req.params.id, elementonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento elemento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto elemento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `elemento aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente elemento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun elemento pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione elemento

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione elemento id ${id}`);  // visualizzo la struttura dei campi immessi dall'elemento 

    // definisco la strsql per lettura elemento

    let strsql_Inqu = `select * from elementos where id= ${id} `;

    let strsql =  `delete from elementos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura elementos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione elemento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione elemento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `elemento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente elemento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna elemento presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.deleteAll = (req,res)=> {  

    console.log('sono in deleteAll di elementi');
    let strsql =  `delete from elementos`;
                   
   // verifico prima l'esistenza del record

     db.query(strsql,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in cancellazione all elementos --- ${err}`,
                data:null
            });
            return;
        }
        res.status(200).send({ 
            message: `cancellata regolarmente tabella elementos  `,
            rc: 'ok',
            data:null
            }); 
       });  
               
}  

exports.getlastid = (req,res)=> {
    
    let id = 99999;
    
    const strsql = strSql + ' where `elementos`.`id` <= ' + id;

    console.log('backend - getlastid - strsql --> ' + strsql);
  
   // let strsql = `select * from elementos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2de errore il lettura elementos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura elementos for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   elemento `)

            res.status(200).send({ 
                message:`ultimo elemento in tabella `,
                rc: 'ok',
                data:result[0]
            });                    
         }

    });  
}
