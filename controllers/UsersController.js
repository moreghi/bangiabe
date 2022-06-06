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

/*    quando sistemate le relazioni su .findOne  (hidran/Matteo)

const strSql = 'select `users`.`id`, `cognome`, `nome`, `idStato`, `tipoacc`, `username`, `password`, `email`, `idRuolo`, `idRuolo_Day`, `idruoloweb`, `noteutente`, `photo`, `eseguitaAbilitazione`, `remember_token`, `email_verified_at`, `users`.`key_utenti_operation`, `users`.`created_at`, `users`.`updated_at`, `d_ruolo`, `d_ruolo_day`, `d_Stato_Utente`, `d_ruolo_web`' +
                ' FROM `users` ' + 
                ' JOIN `t_ruolos` ON `t_ruolos`.`id` = `users`.`idRuolo` ' +
                ' JOIN `t_ruolo_days` ON `t_ruolo_days`.`id` = `users`.`idRuolo_Day` ' + 
                ' JOIN `t_ruolo_webs` ON `t_ruolo_webs`.`id` = `users`.`idruoloweb` ' +
                ' JOIN `t_stato_utentes` ON `t_stato_utentes`.`id` = `users`.`idStato` '


*/

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

// --------------
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);

// -----------

const strSql = 'select `users`.`id`, `cognome`, `nome`, `idStato`, `tipoacc`, `username`, `password`, `email`, `idRuolo`,  `noteutente`, `photo`, `eseguitaAbilitazione`, `remember_token`, `email_verified_at`, `key_utenti_operation`, `created_at`, `updated_at`' +
                ' FROM `users` ' 

// ------   ok  nuova modalità di craere strsql  
exports.getAllUsers = (req,res)=> {
 
    let strsql = strSql; // 'select * from users';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all users - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli utenti ' + result.length);  

            console.log(`rilevati ${result.length} utenti `)
            res.status(200).send({ 
                message:'Situazione attuale Utenti',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo utente
// ------   ok  nuova modalità di craere strsql  
exports.getUserbyid = (req,res)=> {
    
    let id = req.params.id;
  
    /*    vecchia modalità senza strSql
    const strsql = 'SELECT * ' + 
    'FROM `users` ' +
    'JOIN `t_ruolo_days` ON `t_ruolo_days`.`id` = `users`.`idRuolo_Day`' +
    'where `users`.`id` = ' + id;
    */
    const strsql = strSql + ' where `users`.`id` = ' + id;

    console.log('backend - getUserbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura users for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura users for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)

            res.status(200).send({ 
                message:`situazione attuale per utente id: .....  ${id}`,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                data:null
            });
        }

    });  
}


// lettura singolo utente
// ------   ok  nuova modalità di craere strsql  
exports.getUserbylevel = (req,res)=> {
    
    let id = req.params.level;
  
    /*    vecchia modalità senza strSql
    const strsql = 'SELECT * ' + 
    'FROM `users` ' +
    'JOIN `t_ruolo_days` ON `t_ruolo_days`.`id` = `users`.`idRuolo_Day`' +
    'where `users`.`id` = ' + id;
    */
    const strsql = strSql + ' where `users`.`idRuolo` = ' + id;

    console.log('backend - getUserbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura users for livello - key ' + id);

            res.status(500).send({
                message: `errore il lettura users for livello -  key ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)

            res.status(200).send({ 
                message:`situazione attuale per utente livello: .....  ${id}`,
                number:  result.length,
                data:result
            });                    
        }else {
            console.log(`nessun record presente per il livello: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for il livello: ${id}`,
                number:  result.length,
                data:null
            });
        }

    });  
}





// lettura singolo utente
// ------   ok  nuova modalità di craere strsql                       
exports.getUserbyemail = (req,res)=> {
    
    let email = req.params.email;
  
   // let strsql = `select * from users where email= '${id}' `;

   const strsql = strSql + " where `email` = '" + email + "' ";

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura users for email ' + email);

            res.status(500).send({
                message: `errore il lettura users for email ${email}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)

            res.status(200).send({ 
                message:`situazione attuale per utente email: .....  ${email}`,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} `);
            res.status(200).send({
                message: `nessun user pressente for email: ${email}`,
                data:null
            });
        }

    });  
}



exports.getUserbyemailecognome = (req,res)=> {
    
    console.log('users - getUserbyemailecognome appena entrato ' + JSON.stringify(req.params));
    let email = req.params.email;
    let cognome = req.params.cognome;

   // let strsql = `select * from users where email= '${id}' `;

   const strsql = strSql + " where `email` = '" + email + "' and `cognome` = '" + cognome + "' ";

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura users for email ' + email + ' e cognome ' + cognome);

            res.status(500).send({
                message: `errore il lettura users for email ${email}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  -----   users `)

            res.status(200).send({ 
                message:`situazione attuale per utente email: .....  ${email} e cognome .... ${cognome}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} e cognome .... ${cognome} `);
            res.status(200).send({
                message: `nessun user pressente for email: ${email} e cognome .... ${cognome}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}









// lettura utenti per tipo Utente (Sanfra e Non sanfra)
// ------   ok  nuova modalità di craere strsql  
exports.getUserbytipo = (req,res)=> {
   
    console.log('getUserbytipo - ruoloweb: ' + req.params.idruolo);

    let id = req.params.idruolo;
    let strsql = '';
    if(key == 0) {
        strsql =  strSql + ' where `idruoloweb` = ' + id;            //`select * from users where idruoloweb = 0 `;
    } else {
        strsql =  strSql + ' where `idruoloweb` != 0' ;           //       `select * from users where idruoloweb != 0 `; 
    }

    console.log('getUserbytipo - strsql: ' + strsql);


    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura users for idruoloweb ' + id);

            res.status(500).send({
                message: `errore il lettura users for ruoloweb ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)

            res.status(200).send({ 
                message:`situazione attuale per utenti `,
                number:  result.length,
                key: req.params.idruolo,
                data:result
            });                    
        }else {
            console.log(`nessun record presente per ruolo selezionato`);
            res.status(200).send({
                message: `nessun user pressente for ruolo selezionato`,
                data:null
            });
        }

    });  
}



// ------   ok  nuova modalità di craere strsql  
exports.getAllusersbyruolo = (req,res)=> {
 
    console.log('backend -----------------------------  getAllusersbyruolo ' + req.params.ruolo);
    
    let ruolo = req.params.ruolo;
    let strsql = '';

    switch (ruolo)  {
        case 'D':
     //       strsql = 'SELECT users.*, t_ruolos.d_ruolo FROM users INNER JOIN t_ruolos ON t_ruolos.id = users.idRuolo WHERE users.idRuolo > 0 and users.idRuolo < 99';
            strsql =  strSql + ' where `idRuolo` > 0 and `idRuolo` < 99';  
            break;
        case 'S':
      //      strsql = 'SELECT users.*, t_ruolos.d_ruolo FROM users INNER JOIN t_ruolos ON t_ruolos.id = users.idRuolo WHERE users.idRuolo = 99';
            strsql =  strSql + ' where `idRuolo` = 99';
            break;
        case 'N':
     //       strsql = 'SELECT users.*, t_ruolos.d_ruolo FROM users INNER JOIN t_ruolos ON t_ruolos.id = users.idRuolo WHERE users.idRuolo = 0';
            strsql =  strSql + ' where `idRuolo` = 0';
          break;
       }

   // let strsql = 'SELECT users.*, t_ruolos.d_ruolo FROM users INNER JOIN t_ruolos ON t_ruolos.id = users.idRuolo WHERE users.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all users - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli utenti con ruolo' + result.length);  

            console.log(`rilevati ${result.length} utenti `)
            res.status(200).send({ 
                message:'Situazione attuale Utenti con ruolo',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// creazione nuovo utente   (post)

exports.createNewUser = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let photo = '0.jpg';
      let idStato = req.body.idStato;
      let tipoacc = req.body.tipoacc;
      let username = req.body.username;

      let password = bcrypt.hashSync(req.body.password, salt);
      let email = req.body.email;
      let idRuolo = req.body.idRuolo;
      let noteUtente = req.body.noteUtente;
      let id_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into users
                  (cognome,nome,photo,idStato,tipoacc,username,password,email,idRuolo,noteUtente,key_utenti_operation) 
                  valueS
                  (
                     '${cognome}','${nome}','${photo}','${idStato}','${tipoacc}','${username}','${password}','${email}','${idRuolo}','${noteUtente}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo utente su tabella users ');
              res.status(500).send({
                message: `errore in registrazione nuovo utente su tabella users - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Utente inserito regolarmente `);
          res.status(200).send({
            message: `Utente inserito regolarmente`,
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateUserByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let photo = req.body.photo;
    let idStato = req.body.idStato;
    let tipoacc = req.body.tipoacc;
    let username = req.body.username;
    let email = req.body.email;
    let idRuolo = req.body.idRuolo;
    let noteUtente = req.body.noteUtente;
  //  let remember_token = req.body.remember_token;
  //  let email_verified_at = req.body.email_verified_at;
    let id_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update users set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    photo = '${photo}',
                    idStato = '${idStato}',
                    tipoacc = '${tipoacc}',
                    username = '${username}',
                    email = '${email}',
                    idRuolo = '${idRuolo}',
                    noteUtente = '${noteUtente}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura users for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura users for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto utente ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato utente id: ${id}`);
                    res.status(200).send({ 
                        message: `Utente aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona

exports.updateUserByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${id} `;
    
    // definisco 
   let usernew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            noteUtente: req.body.noteUtente,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura users for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura users for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE users SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto utente ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Utente aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione utente

exports.deleteUser = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${id} `;

    let strsql =  `delete from users  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura users for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione utente id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione utente -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Utente  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.confirmeduser  = (req,res)=> {

    console.log(`backend ----- user.createUserbyprenotazione - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    // crypto la passeord
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log('password : ' + req.body.password + ' hash: ' + hash); 

    try{
     
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let username = req.body.username;
      let telefono = req.body.telefono;
      let password = hash;
     
      let strsql =  `insert into users
                (cognome,nome,email,telefono,username,password) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}','${username}','${password}' 
                )`;

        console.log('pronto per insert: ' + strsql);

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in creazione users da conferma su tabella users ');
            res.status(500).send({
            message: `errore in creazione users da conferma su tabella users - errore: ${err}`,
            rc: 'kk',
            data:null
            });
            return;
          }
          console.log(result, `result ...... utente inserito regolarmente `);
          res.status(200).send({
          message: `utente inserito regolarmente`,
          rc: 'ok',
          data:result
          });
      });
    }catch(error){
        console.log(error, `errore ...... utente non registrato `);
        res.status(500).json({
            PrenConfirm: [],
            error: error.message,
            message: "Errore in registrazione users : error: " + error
        });
  }


} 