module.exports = (sequelize, Sequelize) => {
    const Biglietto = sequelize.define("bigliettos", {
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
      evento: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idprenotazione: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      tipo: {
        type: Sequelize.INTEGER,
        underscored: 0
      },      
      numero: {
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
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cellulare: {
        type: Sequelize.STRING,
        underscored: 0
      },
      datapre: {
        type: Sequelize.STRING,
        underscored: 0
      },
      dataconf: {
        type: Sequelize.STRING,
        underscored: 0
      },
      dataemi: {
        type: Sequelize.STRING,
        underscored: 0
      },
      settore: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      fila: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      posto: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      modpag: {
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
     return Biglietto;
  };