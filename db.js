// definizioni del database   --  nuova versiona dal 24/11/2021

const config = require("./config.json");
const mysql = require('mysql2');



// originale  per sviluppo su localhost

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);



let db;

//    variante per connettere sia localhost che in produzione su heroku
if(process.env.CLEARDB_DATABASE_URL) {
  db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
} else {
    db = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database:config.database,
      port:config.port
  });

}


// Originale per utilizzo in localhost
/*
 db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database:config.database,
    port:config.port
})
*/

// connettere Mysql
db.connect(err=> {
    if(err) {
        console.log(err,'errore in connessione Mysql');
    }else {
        console.log('Mysql connected con successo');
    }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// model di tutte le tabelle utilizzate

db.user = require("./models/user.js")(sequelize, Sequelize);
db.socio = require("./models/socio.js")(sequelize, Sequelize);
db.userlevel = require("./models/userlevel.js")(sequelize, Sequelize);
db.bandieragialla = require("./models/bandieragialla.js")(sequelize, Sequelize);
db.tesseramento = require("./models/tesseramento.js")(sequelize, Sequelize);
db.localita = require("./models/t_localita.js")(sequelize, Sequelize);
db.sociosearch = require("./models/sociosearchs.js")(sequelize, Sequelize);
db.quotatessra = require("./models/quotatessera.js")(sequelize, Sequelize);
db.manifestazione = require("./models/manifestazione.js")(sequelize, Sequelize);
db.evento = require("./models/evento.js")(sequelize, Sequelize);
db.logistica = require("./models/logistica.js")(sequelize, Sequelize);
db.logsettore = require("./models/logsettore.js")(sequelize, Sequelize);
db.logfila = require("./models/logfila.js")(sequelize, Sequelize);
db.logsettfilaposti = require("./models/logsettfilaposti.js")(sequelize, Sequelize);
db.eventosettfilaposti = require("./models/eventosettfilaposti.js")(sequelize, Sequelize);



// work
db.elemento = require("./models/elemento.js")(sequelize, Sequelize);
// db.adesioneconfirmed = require("./models/adesioneconfirmed.js")(sequelize, Sequelize);

// tabelle correlate
db.truolo = require("./models/t-ruolo.js")(sequelize, Sequelize);
db.tstatoutente = require("./models/t-stato-utente.js")(sequelize, Sequelize);
db.tstatomanifestazione = require("./models/t-stato-manifestazione.js")(sequelize, Sequelize);
db.tstatoevento = require("./models/t-stato-evento.js")(sequelize, Sequelize);
db.ttipobiglietto = require("./models/t-tipo-biglietto.js")(sequelize, Sequelize);
db.ttagliabiglietto = require("./models/t-taglia-biglietto.js")(sequelize, Sequelize);
db.tstatotagliabiglietto = require("./models/t-stato-taglia-biglietto.js")(sequelize, Sequelize);
db.tstatologistica = require("./models/t-stato-logistica.js")(sequelize, Sequelize);
db.ttipologistica = require("./models/t-tipo-logistica.js")(sequelize, Sequelize);


//  ----------------------------------------------------------------------------- relazioni tra tabelle
// relazione tra Users e Truolo

// db.truolo.hasMany(db.user,{ as: "users" });   originale                db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});
db.truolo.hasMany(db.user,{ as: "Truolo", foreignKey : 'id'});
db.user.belongsTo(db.truolo, {
  foreignKey: "idRuolo",
  attribute: ["d_ruolo"],
  as: "t_ruolos",
});


// relazione tra Users e Tstatoutente
// db.tstatoutente.hasMany(db.user, { as: "users" });     // originale
db.tstatoutente.hasMany(db.user, { as: "Tstatoutente", foreignKey : 'id' });
db.user.belongsTo(db.tstatoutente, {
  foreignKey: "idStato",
  attribute: ["d_stato_utente"],
  as: "t_stato_utentes",
});

// ----------------------------------------------  relazioni  Manifestazione
// relazione tra Manifestazione e Tstatomanifestazione
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatomanifestazione.hasMany(db.manifestazione, { as: "Tstatomanifestazione", foreignKey : 'idt'}); 
db.manifestazione.belongsTo(db.tstatomanifestazione, {
  foreignKey: "stato",
  attribute: ["d_stato_manifestazione"],
  as: "t_stato_manifestaziones",          
 
});






module.exports = db;