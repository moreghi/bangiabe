module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
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
      idStato: {
         // fk in Tstatoutente
        type: Sequelize.INTEGER,
        allowNull:false,
        required:true,
        underscored: 0
      },
      tipoacc: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      username: {
        type: Sequelize.STRING,
        underscored: 0
      },
      password: {
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
      idRuolo: {
        // fk in Truolo
        type: Sequelize.INTEGER,
        allowNull:false,
        required:true,
        underscored: 0
      },
      idLevel: {
        // fk in tLevel
        type: Sequelize.INTEGER,
        allowNull:false,
        required:true,
        underscored: 0
      },
      noteutente: {
        type: Sequelize.STRING,
        underscored: 0
      },
      photo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      eseguitaAbilitazione: {
        type: Sequelize.STRING,
        underscored: 0
      },
      remember_token: {
        type: Sequelize.STRING,
        underscored: 0
      },
      email_verified_at: {
        type: Sequelize.DATE,
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
  
/*
      User.associate = models => {
        User.hasMany(Truolo, {
          sourceKey: 'id',
          foreignKey: 'ownerId',
          as: 'posts',
         });
         User.belongsToMany(Role, {
          through: 'userrole',
          foreignKey: 'userId',
          otherKey: 'roleId',
          as: 'roles',
         });
      }




      static associate() {
        User.hasMany(Post, {
         sourceKey: 'id',
         foreignKey: 'ownerId',
         as: 'posts',
        });
        User.belongsToMany(Role, {
         through: 'userrole',
         foreignKey: 'userId',
         otherKey: 'roleId',
         as: 'roles',
        });
       }

*/




    return User;
  };

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
//             module.exports = User

