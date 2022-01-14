const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maps:{
      type: DataTypes.STRING,
      allowNull:false
    }   
  },
  {
    timestamps: false
  }
  );
};
