module.exports = (sequelize, Sequelize) => {
    const Manifestazione = sequelize.define("manifestaziones", {
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
      descManif: {
        type: Sequelize.STRING,
        underscored: 0
      },
      anno: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      dtInizio: {
        type: Sequelize.STRING,
        underscored: 0
      },
      dtFine: {
        type: Sequelize.STRING,
        underscored: 0
      },
      numUtentiTot: {
         // fk in Tstatoutente
        type: Sequelize.INTEGER,
        underscored: 0
      },
      incassatoTot: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },   
      noteManifestazione: {
        type: Sequelize.STRING,
        underscored: 0
      },
      stato: {
        // fk in Truolo
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
     return Manifestazione;
  };

 
