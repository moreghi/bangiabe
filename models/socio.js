module.exports = (sequelize, Sequelize) => {
    const Socio = sequelize.define("socios", {
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
      stato: {
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
      sesso: {
        type: Sequelize.STRING,
        underscored: 0
      },
      locNascita: {
         // fk in Tstatoutente
        type: Sequelize.INTEGER,
        allowNull:false,
        required:true,
        underscored: 0
      },
  
      luogonascita: {
        type: Sequelize.STRING,
        underscored: 0
      },
      datanascita: {
        type: Sequelize.STRING,
        underscored: 0
      },   
      residenza: {
        // fk in Tstatoutente
       type: Sequelize.INTEGER,
       allowNull:false,
       required:true,
       underscored: 0
     },      
     indirizzo: {
        type: Sequelize.STRING,
        underscored: 0
      },         
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      telcasa: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cell: {
        type: Sequelize.STRING,
        underscored: 0
      },
      tessera: {
        type: Sequelize.STRING,
        underscored: 0
      },
      operativo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      notesocio: {
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
     return Socio;
  };

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
//             module.exports = User

