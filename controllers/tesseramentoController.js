const strSql = 'select `tesseramentos`.*' +
                ' FROM `tesseramentos` '

const db = require('../db');



// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from tesseramentos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all tesseramentos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i tesseramento ' + result.length);  

            console.log(`rilevati ${result.length} tesseramento `)
            res.status(200).send({ 
                message:'Situazione attuale tesseramento',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun tesseramento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo tesseramentoo
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `tesseramentos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from tesseramentos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura tesseramentos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura tesseramentos for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   tesseramento `)

            res.status(200).send({ 
                message:`situazione attuale per tesseramentoo id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun tesseramentoo presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getbySocio = (req,res)=> {
    
    let idSocio = req.params.socio;
    
    const strsql = strSql + ' where `tesseramentos`.`idSocio` = ' + idSocio;

    console.log('backend - getbyidSocio - strsql --> ' + strsql);
  
   // let strsql = `select * from tesseramentos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura tesseramentos for idSocio ' + idSocio);

            res.status(500).send({
                message: `2 errore il lettura tesseramentos for idSocio ${idSocio}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------ byIdSocio ------------------   tesseramento `)

            res.status(200).send({ 
                message:`situazione attuale per tesseramentoo idSocio: .....  ${idSocio}`,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per id: ${idSocio} `);
            res.status(200).send({
                message: `nessun tesseramento presente for id selezionato`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getbyAnnoeSocio = (req,res)=> {
    
    let idSocio = req.params.socio;
    let anno = req.params.anno;
    
    const strsql = strSql + ' where `tesseramentos`.`idSocio` = ' + idSocio + ' and `tesseramentos`.`anno` = ' + anno;

    console.log('backend - getbyAnnoeSocio - strsql --> ' + strsql);
  
   // let strsql = `select * from tesseramentos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura tesseramentos for idSocio ' + idSocio + ' e anno: ' + anno);

            res.status(500).send({
                message: `2 errore il lettura tesseramentos for idSocio ${idSocio} e anno ${anno} - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------ byAnnoeSocio ------------------   tesseramento `)

            res.status(200).send({ 
                message:`situazione attuale per tesseramento idSocio: .....  ${idSocio}  per anno: ${anno}`,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per id: ${idSocio} nell anno ${anno}`);
            res.status(200).send({
                message: `nessun tesseramento presente `,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getbyTessera = (req,res)=> {
    
    let idTessera = req.params.tessera;
    
    const strsql = strSql + " where `tesseramentos`.`idTessera` = '" + idTessera + "' ";

    console.log('backend - getbyidTessera - strsql --> ' + strsql);
  
   // let strsql = `select * from tesseramentos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura tesseramentos for idTessera ' + idTessera);

            res.status(500).send({
                message: `2 errore il lettura tesseramentos for idTessera ${idTessera}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------ byIdTessera ------------------   tesseramento `)

            res.status(200).send({ 
                message:`situazione attuale per tesseramentoo idTessera: .....  ${idTessera}`,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idTessera: ${idTessera} `);
            res.status(200).send({
                message: `nessun tesseramento presente for idTessera: ${idTessera}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


// creazione nuovo tesseramentoo   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo tesseramentoo');  // visualizzo la struttura dei campi immessi dall'tesseramentoo 
  
      // creo le variabili dai campi di input
      let idSocio = req.body.idSocio;
      let idTessera = req.body.idTessera;
      let anno = req.body.anno;
      let dataiscr = req.body.dataiscr;
      let importo = req.body.importo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into tesseramentos
                  (idSocio,idTessera,anno,dataiscr,importo,key_utenti_operation) 
                  valueS
                  (
                     ${idSocio},'${idTessera}',${anno},'${dataiscr}',${importo},'${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo tesseramento su tabella tesseramentos ');
              res.status(500).send({
                message: `errore in registrazione nuovo tesseramento su tabella tesseramentos - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... tesseramentoo inserito regolarmente `);
          res.status(200).send({
            message: `tesseramento inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento tesseramentoo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica tesseramentoo id ${id}`);  // visualizzo la struttura dei campi immessi dall'tesseramentoo 

    // definisco la strsql per lettura tesseramentoo

    let strsql_Inqu = `select * from tesseramentos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idSocio = req.body.idSocio;
    let idTessera = req.body.idTessera;
    let anno = req.body.anno;
    let stato = req.body.stato;
    let dataiscr = req.body.dataiscr;
    let importo = req.body.importo;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update tesseramentos set
                    idSocio = ${idSocio},
                    idTessera = '${idTessera}',
                    anno = ${anno},
                    stato = ${stato},
                    dataiscr = '${dataiscr}',
                    importo = ${importo},
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura tesseramentos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura tesseramentos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento tesseramentoo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto tesseramentoo ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato tesseramentoo id: ${id}`);
                    res.status(200).send({ 
                        message: `tesseramentoo aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente tesseramentoo id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun tesseramentoo pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento tesseramentoo   // metodo 1  -- funziona

exports.updatetesseramentooByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica tesseramentoo id ${id}`);  // visualizzo la struttura dei campi immessi dall'tesseramentoo 

  // definisco la strsql per lettura tesseramentoo

    let strsql_Inqu = `select * from tesseramentos where id= ${id} `;
    
    // definisco 
   let tesseramentoonew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            tesseramentooname: req.body.tesseramentooname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notetesseramentoo: req.body.notetesseramentoo,
            key_tesseramento_operation: req.body.key_tesseramento_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura tesseramentos for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura tesseramentos for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE tesseramentos SET ? WHERE id = ' + req.params.id, tesseramentoonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento tesseramentoo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto tesseramentoo ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `tesseramentoo aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente tesseramentoo id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun tesseramentoo pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione tesseramentoo

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione tesseramento id ${id}`);  // visualizzo la struttura dei campi immessi dall'tesseramentoo 

    // definisco la strsql per lettura tesseramentoo

    let strsql_Inqu = `select * from tesseramentos where id= ${id} `;

    let strsql =  `delete from tesseramentos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura tesseramentos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione tesseramentoo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione tesseramentoo -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `tesseramentoo  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente tesseramentoo id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun tesseramentoo pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  




