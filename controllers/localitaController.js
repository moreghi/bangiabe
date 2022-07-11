

const strSql = 'select `t_localitas`.*  ' +
               ' FROM `t_localitas` '
const order = ' order by `t_localitas`.`d_localita`'
const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all t_localitas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i soci ' + result.length);  

            console.log(`rilevati ${result.length} soci `)
            res.status(200).send({ 
                message:'Situazione attuale soci',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun localita pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo localita
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `t_localitas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from t_localitas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura t_localitas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura t_localitas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   localita `)

            res.status(200).send({ 
                message:`situazione attuale per localita id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun localita presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getbydlocalita = (req,res)=> {
    
    let local = req.params.local;
    
    const strsql = strSql + " where `t_localitas`.`d_localita` = '" + local + "' ";

    console.log('backend - getbydlocalita - strsql --> ' + strsql);
  
   // let strsql = `select * from t_localitas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'285 errore il lettura t_localitas for d_localita ' + local);

            res.status(500).send({
                message: `2 errore il lettura t_localitas for d_localita ${local}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   localita `)

            res.status(200).send({ 
                message:`situazione attuale per localita: .....  ${local}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per nome localita: ${local} `);
            res.status(200).send({
                message: `nessun localita presente for localita: ${local}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}




// creazione nuovo localita   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo localita');  // visualizzo la struttura dei campi immessi dall'localita 
  
      // creo le variabili dai campi di input
      let d_localita = req.body.d_localita;
      let cap = req.body.cap;
      let pr = req.body.pr;
      let key_utenti_operation = req.body.key_utenti_operation;

      let strsql =  `insert into t_localitas
                  (d_localita,cap,pr,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${d_localita}'),'${cap}',UPPER('${pr}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo localita su tabella t_localitas ');
              res.status(500).send({
                message: `errore in registrazione nuovo localita su tabella t_localitas - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... localita inserito regolarmente `);
          res.status(200).send({
            message: `localita inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento localita   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica localita id ${id}`);  // visualizzo la struttura dei campi immessi dall'localita 

    // definisco la strsql per lettura localita

    let strsql_Inqu = `select * from t_localitas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

      let d_localita = req.body.d_localita;
      let cap = req.body.cap;
      let pr = req.body.pr;
      let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update t_localitas set
                    d_localita = UPPER('${d_localita}'),
                    cap = '${cap}',
                    pr = UPPER('${pr}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura t_localitas for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura t_localitas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento localita id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto localita ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato localita id: ${id}`);
                    res.status(200).send({ 
                        message: `localita aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente localita id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun localita pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento localita   // metodo 1  -- funziona

exports.updatelocalitaByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica localita id ${id}`);  // visualizzo la struttura dei campi immessi dall'localita 

  // definisco la strsql per lettura localita

    let strsql_Inqu = `select * from t_localitas where id= ${id} `;
    
    // definisco 
   let localitanew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            localitaname: req.body.localitaname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notelocalita: req.body.notelocalita,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura t_localitas for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura t_localitas for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_localitas SET ? WHERE id = ' + req.params.id, localitanew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento localita id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto localita ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `localita aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente localita id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun localita pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione localita

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione localita id ${id}`);  // visualizzo la struttura dei campi immessi dall'localita 

    // definisco la strsql per lettura localita

    let strsql_Inqu = `select * from t_localitas where id= ${id} `;

    let strsql =  `delete from t_localitas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura t_localitas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione localita id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione localita -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `localita  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente localita id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun localita pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getLastLocalitaid = (req,res)=> {

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastLocalitaid ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `t_localitas`.`id` < ' + tappo + ' order by `t_localitas`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all t_localitas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura localita inserita id' + result.length);  

            console.log(`rilevate ${result.length} localita `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                rc: 'ok',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna localita presente  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}
