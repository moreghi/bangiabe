module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messagges", {
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
      tipo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      title: {
        type: Sequelize.STRING,
        underscored: 0
      },
      message01: {
        type: Sequelize.STRING,
        underscored: 0
      },
      message02: {
        type: Sequelize.STRING,
        underscored: 0
      },
      image: {
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
        timestamps: true,
        underscored: 0,
      });

      return Message;
  };

  