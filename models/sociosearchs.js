module.exports = (sequelize, Sequelize) => {
    const Sociosearchs = sequelize.define("sociosearchs", {
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
      d_search: {
        type: Sequelize.STRING,
        underscored: 0
      },
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      tessere: {
        type: Sequelize.STRING,
        underscored: 0
      },
      localita: {
        type: Sequelize.STRING,
        underscored: 0
      },
      operativo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      sesso: {
        type: Sequelize.STRING,
        underscored: 0
      },
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cell: {
        type: Sequelize.STRING,
        underscored: 0
      },
      orderby: {
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
     return Sociosearchs ;
  };