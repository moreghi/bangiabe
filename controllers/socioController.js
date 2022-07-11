
/*
const strSql = 'select `socios`.`id`, `cognome`, `nome`, `stato`, `sesso`, `locNascita`, `datanascita`, `residenza`, `indirizzo`, `email`, `telcasa`, `cell`, `tessera`, `operativo`, `notesocio`, `socios`.`key_utenti_operation`, `socios`.`created_at`, `socios`.`updated_at`, `t_localitas`.`d_localita` , `t_localitas`.`d_localita` as d_localita1' +
                ' FROM `socios` ' + 
                ' JOIN `t_localitas` ON `t_localitas`.`id` = `socios`.`locnascita` ' +
                ' JOIN `t_localitas` ON `t_localitas`.`id` = `socios`.`residenza` '
*/

const strSql = 'select so.id, so.cognome, so.nome, so.stato, so.sesso, so.locNascita, so.datanascita, so.residenza, so.indirizzo, so.email, so.telcasa, so.cell, so.tessera, so.operativo, so.notesocio, so.key_utenti_operation, so.created_at, so.updated_at, na.d_localita as localNascita, re.d_localita as localResidenza ' +
               ' FROM socios AS so ' +
               ' LEFT JOIN t_localitas na ' +
               ' ON  so.locNascita = na.id ' +
               ' left JOIN t_localitas as re ' +
               ' ON  so.residenza = re.id'




const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

// --------------
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);


// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from socios';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all socios - erro: ${err}`,
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
                message: `nessun socio presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo socio
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where so.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from socios where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura socios for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura socios for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale per socio id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun socio presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo socio   (post)

exports.createNew = (req,res)=> {
    
      console.log('Creazione nuovo socio:  ' + JSON.stringify(req.body));  // visualizzo la struttura dei campi immessi dall'socio 
  
      // creo le variabili dai campi di input
      let stato = req.body.stato;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let sesso = req.body.sesso;
      let locNascita = req.body.locNascita;
      let datanascita = req.body.datanascita;
      let residenza = req.body.residenza;
      let indirizzo = req.body.indirizzo;
      let email = req.body.email;
      let telcasa = req.body.telcasa;
      let cell = req.body.cell;
      let tessera = req.body.tessera;
      let operativo = req.body.operativo;
      let notesocio = req.body.notesocio;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      let strsql =  `insert into socios
                  (stato,cognome,nome,sesso,locNascita,datanascita,residenza,indirizzo,email,telcasa,cell,tessera,operativo,notesocio,key_utenti_operation) 
                  valueS
                  (
                    ${stato},UPPER('${cognome}'),UPPER('${nome}'),'${sesso}','${locNascita}','${datanascita}',${residenza},UPPER('${indirizzo}'),'${email}','${telcasa}','${cell}','${tessera}','${operativo}','${notesocio}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo socio su tabella socios ');
              res.status(500).send({
                message: `errore in registrazione nuovo socio su tabella socios - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... socio inserito regolarmente `);
          res.status(200).send({
            message: `socio inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento socio   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica socio id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from socios where id= ${id} `;

    // definisco le variabili per aggiornamento campi
    let stato = req.body.stato;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let sesso = req.body.sesso;
    let locNascita = req.body.locNascita;
    let datanascita = req.body.datanascita;
    let residenza = req.body.residenza;
    let indirizzo = req.body.indirizzo;
    let email = req.body.email;
    let telcasa = req.body.telcasa;
    let cell = req.body.cell;
    let tessera = req.body.tessera;
    let operativo = req.body.operativo;
    let notesocio = req.body.notesocio;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update socios set
                    stato = ${stato},
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    sesso = '${sesso}',
                    locNascita = ${locNascita},
                    datanascita = '${datanascita}',
                    residenza = ${residenza},
                    indirizzo = UPPER('${indirizzo}'),
                    email = '${email}',
                    telcasa = '${telcasa}',
                    cell = '${cell}',
                    tessera = '${tessera}',                   
                    operativo = '${operativo}',
                    notesocio = '${notesocio}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura socios for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura socios for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto socio ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato socio id: ${id}`);
                    res.status(200).send({ 
                        message: `socio aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente socio id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun socio pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento socio   // metodo 1  -- funziona

exports.updatesocioByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica socio id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

  // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from socios where id= ${id} `;
    
    // definisco 
   let socionew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            socioname: req.body.socioname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notesocio: req.body.notesocio,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura socios for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura socios for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE socios SET ? WHERE id = ' + req.params.id, socionew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto socio ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `socio aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente socio id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun socio pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione socio

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione socio id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from socios where id= ${id} `;

    let strsql =  `delete from socios  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura socios for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione socio -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `socio  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente socio id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun socio pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getLastid  = (req,res)=> {

    console.log(`backend ----- socio.getLastid - appena entrato  ------  da fare`);


/*

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    // crypto la passeord
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log('password : ' + req.body.password + ' hash: ' + hash); 

    try{
     
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let socioname = req.body.socioname;
      let telefono = req.body.telefono;
      let password = hash;
     
      let strsql =  `insert into socios
                (cognome,nome,email,telefono,socioname,password) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}','${socioname}','${password}' 
                )`;

        console.log('pronto per insert: ' + strsql);

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in creazione socios da conferma su tabella socios ');
            res.status(500).send({
            message: `errore in creazione socios da conferma su tabella socios - errore: ${err}`,
            rc: 'kk',
            data:null
            });
            return;
          }
          console.log(result, `result ...... socio inserito regolarmente `);
          res.status(200).send({
          message: `socio inserito regolarmente`,
          rc: 'ok',
          data:result
          });
      });
    }catch(error){
        console.log(error, `errore ...... socio non registrato `);
        res.status(500).json({
            PrenConfirm: [],
            error: error.message,
            message: "Errore in registrazione socios : error: " + error
        });
  }
*/

} 

exports.cognNomeCellulare = (req,res)=> {
    
    let cognome = req.params.cognome;
    let nome = req.params.nome;
    let cell = req.params.cell;
    
    const strsql = strSql + " where so.`cognome` = '" + cognome + "' and so.`nome` = '" + nome + "' and so.`cell` = '" + cell + "' ";

    console.log('backend - cognNomeCellulare - strsql --> ' + strsql);
  
   // let strsql = `select * from socios where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura socios for cognome-nome-cell ' + cognome);

            res.status(500).send({
                message: `2 errore il lettura socios for cognome ${cognome} and nome ${nome}  and cell ${cell}             - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale per cognome/nome/cell: .....  ${cognome}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per cognome/nome/cell: ${cognome} `);
            res.status(200).send({
                message: `nessun socio presente for cognome/nome/cell: ${cognome}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.filterSearch = (req,res)=> {
 
    let strsql = req.params.strsql; // 'select * from socios';

    console.log('filterSearch --- ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all socios con vari filtri - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i soci con vari filtri' + result.length);  

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
                message: `nessun socio presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}
