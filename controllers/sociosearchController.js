const strSql = 'select sociosearchs.* ' +
               ' FROM sociosearchs '




const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

// --------------
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);


// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from sociosearchs';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all sociosearchs - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i sociosearchs ' + result.length);  

            console.log(`rilevati ${result.length} sociosearchs `)
            res.status(200).send({ 
                message:'Situazione attuale sociosearchs',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun sociosearchs presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo sociosearchs
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `sociosearchs`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from sociosearchs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura sociosearch for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura sociosearchs for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   sociosearchs `)

            res.status(200).send({ 
                message:`situazione attuale per sociosearchs id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun sociosearchs presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo sociosearchs   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo sociosearchs');  // visualizzo la struttura dei campi immessi dall'sociosearchs 
  
      // creo le variabili dai campi di input
      let d_search = req.body.d_search;
      let tessere = req.body.tessere;
      let stato = req.body.stato
      let sesso = req.body.sesso;
      let localita = req.body.localita;
      let operativo = req.body.operativo;
      let email = req.body.email;
      let cell = req.body.cell;
      let orderby = req.body.orderby;
      let key_utenti_operation = req.body.key_utenti_operation;
  
    
      let strsql =  `insert into sociosearchs
                  (d_search,tessere,stato,sesso,localita,operativo,email,cell,orderby,key_utenti_operation) 
                  valueS
                  (
                     '${d_search}','${tessere}','${stato}','${sesso}','${localita}','${operativo}','${email}','${cell}','${orderby}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo sociosearchs su tabella sociosearchs ');
              res.status(500).send({
                message: `errore in registrazione nuovo sociosearchs su tabella sociosearchs - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... sociosearchs inserito regolarmente `);
          res.status(200).send({
            message: `sociosearchs inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento sociosearchs   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica sociosearchs id ${id}`);  // visualizzo la struttura dei campi immessi dall'sociosearchs 

    // definisco la strsql per lettura sociosearchs

    let strsql_Inqu = `select * from sociosearchs where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_search = req.body.d_search;
    let tessere = req.body.tessere;
    let stato = req.body.stato
    let sesso = req.body.sesso;
    let localita = req.body.localita;
    let operativo = req.body.operativo;
    let email = req.body.email;
    let cell = req.body.cell;
    let orderby = req.body.orderby;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update sociosearchs set
                    d_search = '${d_search}',
                    tessere = '${tessere}',
                    stato = '${stato}',
                    sesso = '${sesso}',
                    localita = ${localita},
                    operativo = '${operativo}',
                    email = '${email}',
                    cell = '${cell}',
                    orderby = '${orderby}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura sociosearchs for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura sociosearchs for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento sociosearchs id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto sociosearchs ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato sociosearchs id: ${id}`);
                    res.status(200).send({ 
                        message: `sociosearchs aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente sociosearchs id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun sociosearchs pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento sociosearchs   // metodo 1  -- funziona

exports.updatesociosearchsByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica sociosearchs id ${id}`);  // visualizzo la struttura dei campi immessi dall'sociosearchs 

  // definisco la strsql per lettura sociosearchs

    let strsql_Inqu = `select * from sociosearchs where id= ${id} `;
    
    // definisco 
   let sociosearchsnew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            sociosearchsname: req.body.sociosearchsname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notesociosearchs: req.body.notesociosearchs,
            key_sociosearchs_operation: req.body.key_sociosearchs_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura sociosearchs for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura sociosearchs for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE sociosearchs SET ? WHERE id = ' + req.params.id, sociosearchsnew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento sociosearchs id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto sociosearchs ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `sociosearchs aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente sociosearchs id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun sociosearchs pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione sociosearchs

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione sociosearchs id ${id}`);  // visualizzo la struttura dei campi immessi dall'sociosearchs 

    // definisco la strsql per lettura sociosearchs

    let strsql_Inqu = `select * from sociosearchs where id= ${id} `;

    let strsql =  `delete from sociosearchs  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura sociosearchs for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione sociosearchs id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione sociosearchs -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `sociosearchs  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente sociosearchs id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun sociosearchs pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  




