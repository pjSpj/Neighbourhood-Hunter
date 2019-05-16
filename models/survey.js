module.exports = (sequelize, DataTypes) => {
  let Survey = sequelize.define('userinfo', {
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
    return Survey
  }
