module.exports = (sequelize, DataTypes) => {
    const Isimenu = sequelize.define(
      "Isimenu",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        menu: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        harga: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        kode: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
        },
        tanggal: {
          type: DataTypes.DATE,
        },
        gambar: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: "isimenu",
        timestamps: false,
      }
    );
    return Isimenu;
  };
  