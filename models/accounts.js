module.exports = (sequelize, DataTypes) => {
    const Accounts = sequelize.define(
      "Accounts",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        identity: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: 'customer',
        },
      },
      {
        sequelize,
        tableName: "Accounts",
        timestamps: false,
      }
    );
    return Accounts;
  };
  