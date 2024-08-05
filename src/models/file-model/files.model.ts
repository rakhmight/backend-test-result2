import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize:Sequelize) => {
  const Files = sequelize.define(
    'files',
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
    },
  )

  return Files
}