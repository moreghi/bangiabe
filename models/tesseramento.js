module.exports = (sequelize, Sequelize) => {
    const Tesseramento = sequelize.define("tesseramentos", {
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
      idSocio: {
        // fk in Tstatoutente
       type: Sequelize.INTEGER,
       allowNull:false,
       required:true,
       underscored: 0
     },
     idTessera: {
        type: Sequelize.STRING,
        underscored: 0
      },
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      anno: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      dataiscr: {
        type: Sequelize.STRING,
        underscored: 0
      },
      importo: {
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
     return Tesseramento;
  };