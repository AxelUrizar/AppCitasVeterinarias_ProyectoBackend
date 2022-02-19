'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE'
      })
    }
  }
  Token.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    token: DataTypes.STRING,
    usuarioId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};