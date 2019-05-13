module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define('User', {
    housing_info: {
      type: DataTypes.STRING
      },
      social_info: {
        type: DataTypes.STRING
        },
      outdoor_info: {
        type: DataTypes.STRING
      },
      health_info: {
        type: DataTypes.STRING
      }  
    })
    return Users
  }