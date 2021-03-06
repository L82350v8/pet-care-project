const bcrypt = require("bcrypt-nodejs");

module.exports = function (Sequelize, DataTypes) {

  const User = Sequelize.define("User", {
    // a username can only be used for a role of owner or caregiver - not both. 
    username: {
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    { underscored: true },
    {
      dialect: 'mysql'
    }
  );

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
