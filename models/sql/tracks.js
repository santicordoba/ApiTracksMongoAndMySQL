const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * SAQUE AFUERA EL ALIAS PARA QUE SE CONFIGURE UNA UNICA VEZ
 */

 Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: 'audio'
  });
  
  Tracks.findAllData = function () {
    Tracks.belongsTo(Storage, {
      foreignKey: "mediaId",
    });
    return Tracks.findAll({ include:
      [
        {
          model: Storage, as: "audio"
        }
      ]});
  };
  
  Tracks.findOneData = function (id) {
    Tracks.belongsTo(Storage, {
      foreignKey: "mediaId",
    });
    return Tracks.findOne({ where: { id }, include:
      [
        {
          model: Storage, as: "audio"
        }
      ]});
  };

// Tracks.find = Tracks.findAll;
// Tracks.findById = Tracks.findByPk;
module.exports = Tracks;