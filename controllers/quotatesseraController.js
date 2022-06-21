const strSql = 'select `quotatesseras`.*' +
                ' FROM `quotatesseras` '

const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from quotatesseras';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all quotatesseras - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti le quote tessere ' + result.length);  

            console.log(`rilevati ${result.length} quote tessere `)
            res.status(200).send({ 
                message:'Situazione attuale quote tessere',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna quote tessere presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo quote tessereo
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `quotatesseras`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from quotatesseras where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura quotatesseras for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura quotatesseras for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   quote tessere `)

            res.status(200).send({ 
                message:`situazione attuale per quota tessera id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun quote tessereo presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


// creazione nuovo quote tessereo   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo quote tessereo');  // visualizzo la struttura dei campi immessi dall'quote tessereo 
  
      // creo le variabili dai campi di input
      let idbg = req.body.idbg;
      let anno = req.body.anno;
      let importo = req.body.importo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  
      let strsql =  `insert into quotatesseras
                  (idbg,anno,importo,key_utenti_operation) 
                  valueS
                  (
                     ${idbg},${anno},${importo},'${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo quote tessere su tabella quotatesseras ');
              res.status(500).send({
                message: `errore in registrazione nuovo quote tessere su tabella quotatesseras - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... quote tessera inserito regolarmente `);
          res.status(200).send({
            message: `quota tessera inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento quote tessereo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica quota tessera id ${id}`);  // visualizzo la struttura dei campi immessi dall'quote tessereo 

    // definisco la strsql per lettura quote tessereo

    let strsql_Inqu = `select * from quotatesseras where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idbg = req.body.idbg;
    let anno = req.body.anno;
    let importo = req.body.importo;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update quotatesseras set
                    idbg = ${idbg},
                    anno = ${anno},
                    importo = ${importo},
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura quotatesseras for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura quotatesseras for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento quote tessereo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto quota tessera ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato quota tessera id: ${id}`);
                    res.status(200).send({ 
                        message: `quota tessera aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente quota tessera id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun quota tessera presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


// cancellazione

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione quota tessera id ${id}`);  // visualizzo la struttura dei campi immessi dall'quote tessereo 

    // definisco la strsql per lettura quote tessereo

    let strsql_Inqu = `select * from quotatesseras where id= ${id} `;

    let strsql =  `delete from quotatesseras  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura quotatesseras for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione quote tessereo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione quote tessereo -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `quote tessereo  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente quote tessereo id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun quote tessereo pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getbyanno = (req,res)=> {
    

    let idbg = req.params.idbg;
    let anno = req.params.anno;
    
    const strsql = strSql + ' where `quotatesseras`.`idbg` = ' + idbg + ' and `quotatesseras`.`anno` = ' + anno;

    console.log('backend - getbyanno - strsql --> ' + strsql);
  
   // let strsql = `select * from quotatesseras where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura quotatesseras for anni ' + anno);

            res.status(500).send({
                message: `2 errore il lettura quotatesseras for anno ${anno}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   quote tessere `)

            res.status(200).send({ 
                message:`situazione attuale per quota tessera anno: .....  ${anno}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per anno: ${anno} `);
            res.status(200).send({
                message: `nessun quota tessera presente for aanno: ${anno}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


