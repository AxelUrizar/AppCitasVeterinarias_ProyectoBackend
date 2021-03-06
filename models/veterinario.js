'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Veterinario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Veterinario.hasMany(models.Cita, {
        foreignKey: 'veterinarioId'
      })
    }
  }
  Veterinario.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    especialidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Veterinario',
  });
  return Veterinario;
};