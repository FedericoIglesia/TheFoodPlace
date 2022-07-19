const { DataTypes } = require("sequelize");

//no need to get the id
module.exports = (sequelize) => {
  sequelize.define("diet", {
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
