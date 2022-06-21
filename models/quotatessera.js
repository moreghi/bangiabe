module.exports = (sequelize, Sequelize) => {
    const Quotatessera = sequelize.define("quotatesseras", {
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
      idbg: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      anno: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      importo: {
        type: Sequelize.FLOAT(5, 2),
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
     return Quotatessera;
  };

