module.exports = (sequelize, Sequelize) => {
    const Eventoposto = sequelize.define("eventopostos", {
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
      keyuserpren: {
        type: Sequelize.STRING,
        underscored: 0
      },
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idlogistica: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idEvento: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idSettore: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idFila: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idPosto: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      cognome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      nome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cellulare: {
        type: Sequelize.STRING,
        underscored: 0
      },
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idbiglietto: {
        type: Sequelize.INTEGER,
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
     return Eventoposto;
  };