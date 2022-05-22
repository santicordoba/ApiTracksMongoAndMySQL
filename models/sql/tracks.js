const { Sequelize, sequelize } = require("../../config/mysql");
const { DataTypes } = require('sequelize');

const Tracks = sequelize.define(
    "tracks",
    {
        name:
        { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        album:
        {
              type: DataTypes.NUMBER,
        },
        cover: 
        {
            type: DataTypes.STRING,
        },
        artist_name: 
        {
            type: DataTypes.STRING,
        },
        artis_nickname: 
        {
            type: DataTypes.STRING,
        },
        artis_nationality: 
        {
            type: DataTypes.STRING,
        },
        duration_start: 
        {
            type: DataTypes.NUMBER,
        },
        duration_end: 
        {
            type: DataTypes.NUMBER,
        },
        mediaId: 
        {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Tracks;