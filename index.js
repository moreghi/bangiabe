const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// porta per mysql
const ports = process.env.PORT || 3000; 

global.__basedir = __dirname;

// importo la connessione al db
const db = require('./db');
// ---------------------------------------------------  importo le rotte
const authRouter = require('./routers/api/auth');
const userRouter = require('./routers/user');
const userlevelRouter = require('./routers/userlevels');
const socioRouter = require('./routers/socio');
const tesseramentoRouter = require('./routers/tesseramento');
const bandieragiallaRouter = require('./routers/bandieragialla');
const localitaRouter = require('./routers/t-locali');
const sociosearchRouter = require('./routers/sociosearch');
const adesioneconfirmRouter = require('./routers/adesioneConfirm');
const quotatesseraRouter = require('./routers/quotatessera');
const manifRouter = require('./routers/manifestaziones');
const eventoRouter = require('./routers/eventos');
const tipobigliettoRouter = require('./routers/t_tipobigliettos');
const logisticaRouter = require('./routers/logisticas');
const logsettoreRouter = require('./routers/logsettores');
const logfilaRouter = require('./routers/logfilas');
const logfilapostiRouter = require('./routers/logfilapostis');
const eventosettfilapostiRouter = require('./routers/eventosettfilapostis');
const eventopostoRouter = require('./routers/eventopostos');
const messageRouter = require('./routers/messages');

const prenoteventoNConfirmRouter = require('./routers/prenoteventoNConfirm');
const prenotazeventoRouter = require('./routers/prenotazevento');
const bigliettoRouter = require('./routers/biglietto');
const prenotazeventomasterConfirmRouter = require('./routers/prenotazeventomasterConfirm');
const cassaRouter = require('./routers/cassa');
const cassamovRouter = require('./routers/cassamov');


// ---------------------------------------------------  importo le rotte  -- tabelle correlate
const ruoloRouter = require('./routers/t-ruolos');
const statouserRouter = require('./routers/t_stato_utentes');
const statomanifRouter = require('./routers/t_stato_manifestaziones')
const statoeventoRouter = require('./routers/t_stato_eventos')
const tagliabigliettoRouter = require('./routers/t_taglia_bigliettos')
const statotagliabigliettoRouter = require('./routers/t_stato_taglia_bigliettos')
const statologisticaRouter = require('./routers/t_stato_logisticas')
const tipologisticaRouter = require('./routers/t_tipo_logisticas')
const statobigliettoRouter = require('./routers/t_stato_bigliettos')
const tipopagamentoRouter = require('./routers/t_tipo_pagamentos')



// work
const elementoRouter = require('./routers/elementos')


// per upload images
const imageRouter = require('./routers/images');


// per il deploy su heroku o altro hosting   2022/04/06

var corsOptions = {
  origin: "https://bandieragialla.ghisellinimoreno.it"
  // origin: "http://localhost:4210"         
 };

const app = express();
// utilizzo i pacchetti
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(express.json());

// -----------------------------------------   utilizzo il router


app.use('/api/auth', authRouter);
app.use('/users', userRouter);
app.use('/userlevel', userlevelRouter); 
app.use('/socio', socioRouter);
app.use('/tesseramento', tesseramentoRouter);
app.use('/bangia', bandieragiallaRouter);
app.use('/tlocalita', localitaRouter);
app.use('/sociosearch', sociosearchRouter);
app.use('/adesioneConfirm', adesioneconfirmRouter);
app.use('/quotatessera', quotatesseraRouter);
app.use('/manif', manifRouter);
app.use('/evento', eventoRouter);
app.use('/ttipobiglietto', tipobigliettoRouter);
app.use('/logistica', logisticaRouter);
app.use('/logsettore', logsettoreRouter);
app.use('/logfila', logfilaRouter);
app.use('/logfilaposti', logfilapostiRouter);
app.use('/eventosettfilaposti', eventosettfilapostiRouter);
app.use('/eventoposto', eventopostoRouter);
app.use('/message', messageRouter);
app.use('/prenoteventoNConfirm', prenoteventoNConfirmRouter);
app.use('/prenotazevento', prenotazeventoRouter);
app.use('/biglietto', bigliettoRouter);
app.use('/prenotazeventomasterConfirm', prenotazeventomasterConfirmRouter);
app.use('/cassa', cassaRouter);
app.use('/cassamov', cassamovRouter);

// tabelle correlate
app.use('/truolo', ruoloRouter);
app.use('/tstatoutente', statouserRouter);
app.use('/tstatomanifestazione', statomanifRouter);
app.use('/tstatoevento', statoeventoRouter);
app.use('/ttagliabiglietto', tagliabigliettoRouter);
app.use('/tstatotagliabiglietto', statotagliabigliettoRouter);
app.use('/tstatologistica', statologisticaRouter);
app.use('/ttipologistica', tipologisticaRouter);
app.use('/tstatobiglietto', statobigliettoRouter);
app.use('/ttipopagamento', tipopagamentoRouter);




// work
app.use('/elemento', elementoRouter);


// per upload images

app.use('/upload', imageRouter);

// ... Va inserito come ultima rotta 
app.use(function(req, res, next){
    //  res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //    res.status(404).send('La pagina non esiste amico!');
 
      next();
    });
  // vecchia modalità
  /*
  app.listen(3000,() => {
      console.log('Server running');
  });
  */
  
  // nuova modalità
  app.listen(ports,() => {
    console.log(`Server sta girando sulla porta ${ports}`);
  });
  
  console.log('index.js');
