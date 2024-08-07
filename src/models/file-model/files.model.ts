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
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
    },
  )

  return Files
}