import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize:Sequelize) => {
  const Users = sequelize.define(
    'users',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
    },
  )

  return Users
}