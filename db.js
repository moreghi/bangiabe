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

// tabelle correlate
db.truolo = require("./models/t-ruolo.js")(sequelize, Sequelize);
db.tstatoutente = require("./models/t-stato-utente.js")(sequelize, Sequelize);

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







module.exports = db;