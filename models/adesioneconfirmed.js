module.exports = (sequelize, Sequelize) => {
    const Adesioneconfirmed = sequelize.define("adesione_confirmeds", {
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
      cognome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      nome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      sesso: {
        type: Sequelize.STRING,
        underscored: 0
      },
      luogonascita: {
        type: Sequelize.STRING,
        underscored: 0
      },
      datanascita: {
        type: Sequelize.STRING,
        underscored: 0
      },
      residenza: {
        type: Sequelize.STRING,
        underscored: 0
      },
      indirizzo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      telcasa: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cell: {
        type: Sequelize.STRING,
        underscored: 0
      },
      token: {
        type: Sequelize.STRING,
        underscored: 0
      },
      codade: {
        type: Sequelize.STRING,
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
     return Adesioneconfirmed;
  };