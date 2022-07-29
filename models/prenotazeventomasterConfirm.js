module.exports = (sequelize, Sequelize) => {
    const Prenotazeventomaster = sequelize.define("prenotazeventomaster_confirmeds", {
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
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      telefono: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idevento: {
         // fk in Tstatoutente
        type: Sequelize.INTEGER,
        underscored: 0
      },
      devento: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idlogistica: {
        type: Sequelize.INTEGER,
        underscored: 0
      }, 
      idsettore: {
        type: Sequelize.INTEGER,
        underscored: 0
      },   
      idfila: {
        type: Sequelize.INTEGER,
        underscored: 0
      },   
      idposto: {
        type: Sequelize.INTEGER,
        underscored: 0
      }, 
      idtipobiglietto: {
        type: Sequelize.INTEGER,
        underscored: 0
      },      
      datapren: {
        type: Sequelize.STRING,
        underscored: 0
      }, 
      keyuserpren: {
        type: Sequelize.STRING,
        underscored: 0
      }, 
      token: {
        type: Sequelize.STRING,
        underscored: 0
      }, 
      codpren: {
        type: Sequelize.STRING,
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
     return Prenotazeventomaster;
  };

  
