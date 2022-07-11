module.exports = (sequelize, Sequelize) => {
    const Evento = sequelize.define("eventos", {
      id:{
            // Sequelize module has INTEGER Data_Type.
          type:Sequelize.INTEGER,
          underscored: 0,
    
          // To increment user_id automatically.
          autoIncrement:true,
    
          // user_id can not be null.
          allowNull:false,
    
          // For uniquely identify user.
          primaryKey:true
          
      },
      descrizione: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idmanif: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      statobiglietti: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      statoposti: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      data: {
        type: Sequelize.STRING,
        underscored: 0
      },
      ora: {
        type: Sequelize.STRING,
        underscored: 0
      },
      localita: {
        type: Sequelize.STRING,
        underscored: 0
      },
      indirizzo: {
        type: Sequelize.STRING,
        underscored: 0
      },   
      cap: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idtipo: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idlogistica: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      d_logistica: {
        type: Sequelize.STRING,
        underscored: 0
      },      
      photo: {
        type: Sequelize.STRING,
        underscored: 0
      },      
      nposti: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      incassato: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },
      spese: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },
      key_utenti_operation: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      created_at: {
        type: Sequelize.DATE,
        underscored: 0
      },
      updated_at: {
        type: Sequelize.DATE,
        underscored: 0
      },
     },{
        timestamps: false,
        underscored: 0,
        freezeTableName: true,
      });
     return Evento;
  };