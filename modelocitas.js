'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cita.hasOne(models.Mascota, {
        foreignKey: 'id',
        as: 'mascota',
        onDelete: 'CASCADE'
      })
      Cita.hasOne(models.Veterinario, {
        foreignKey: 'id',
        as: 'veterinario',
        onDelete: 'ser NULL'
      })
      Cita.hasOne(models.Usuario, {
        foreignKey: 'id',
        as: 'usuario',
        onDelete: 'CASCADE'
      })
    }
  }
  Cita.init({
    descripcion: DataTypes.STRING,
    mascotaId: DataTypes.INTEGER,
    veterinarioId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fechaCita: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cita',
  });
  return Cita;
};