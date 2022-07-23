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


exports.getAlls = (req,res)=> {
 
   
    //let strsql = 'select * from messagges JOIN `userlevels` ON `userlevels`.`id` = `messagges`.`idlevel`';

    const strsql = 'SELECT * ' + 
                    'FROM `messagges` ' 
              
    
    console.log('backend - getAlls - strsql --> ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all messagges - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti messaggi ' + result.length);  

            console.log(`rilevati ${result.length} messaggi `)
            res.status(200).send({ 
                message:'Situazione attuale messaggi',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun messaggio presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo utente
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  

    const strsql = 'SELECT * ' + 
                    'FROM `messagges` ' +
                    'where `messagges`.`id` = ' + id;
    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura messagges for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura messagges for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   messaggi `)

            res.status(200).send({ 
                message:`situazione attuale messaggio id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo profilo  (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let title = req.body.title;
      let tipo = req.body.tipo;
      let message01 = req.body.message01;
      let message02 = req.body.message02;
      let image = req.body.image;

       let strsql =  `insert into messagges
                  (title,tipo,messagge01,messagge02,image) 
                  valueS
                  (
                     '${title}','${tipo}','${message01}','${message02}','${image}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo messaggio su tabella messagges ');
              res.status(500).send({
                message: `errore in registrazione nuovo messaggio su tabella messagges - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Modulo inserito regolarmente `);
          res.status(200).send({
            message: `Modulo inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Messaggio id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from messagges where id= ${id} `;

    // definisco le variabili per aggiornamento campi

   // console.log('updatebyid: req.body ' + JSON.stringify(req.body));

    let title = req.body.title;
    let tipo = req.body.tipo;
    let message01 = req.body.message01;
    let message02 = req.body.message02;
    let image = req.body.image;

    let strsql =  `update messagges set
                    title = '${title}',
                    tipo = '${tipo}',
                    message01 = '${message01}',
                    message02 = '${message02}',
                    image = '${image}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record

    console.log('message- UpdatebyId - ' + strsql);
    
     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in lettura messagges for id ' + id);
            res.status(500).send({
                message: `4 errore in lettura messagges for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Messaggio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Messaggio ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Messaggio id: ${id}`);
                    res.status(200).send({ 
                        message: `Messaggio aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente messaggio id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun messaggio presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  
  

// cancellazione messaggio

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione messaggio id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from messagges where id= ${id} `;

    let strsql =  `delete from messagges  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura messagges for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione messaggio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione messaggio -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `messaggio cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente messaggio id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun messaggio presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


 

