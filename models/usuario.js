'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasMany(models.Mascota, {
        foreignKey: 'usuarioId'
      });
      Usuario.hasMany(models.Token, {
        foreignKey: 'usuarioId'
      })
      Usuario.hasMany(models.Cita, {
        foreignKey: 'usuarioId'
      })
    }
  }
  Usuario.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    contrasenya: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
