module.exports = (sequelize, Sequelize) => {
    const Ttipobiglietto = sequelize.define("t_tipo_bigliettos", {
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
      idtipotaglia: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      d_tipo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idevento: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      importo: {
        type: Sequelize.FLOAT(5, 2),
        underscored: 0
      },
      ntot: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      npren: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      ultimoemesso: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      serie: {
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
        timestamps: true,
        underscored: 0,
      });
  
    return Ttipobiglietto;
  };


 
 
