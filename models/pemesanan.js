module.exports = (sequelize, DataTypes) => {
  const Pemesanan = sequelize.define(
    "Pemesanan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kuantitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes:{
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: "pemesanan",
      timestamps: false,
    }
  );
  return Pemesanan;
};
