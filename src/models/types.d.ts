declare interface SequelizeInterface {
    sequelize: import('sequelize').Sequelize
}

declare interface DBInstance  extends SequelizeInterface {
    users: import('sequelize').ModelCtor<Model<UserI, any>>,
    files: import('sequelize').ModelCtor<Model<FileI, any>>
}