module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('user', {
       fullname:{type: DataTypes.STRING, allowNull: false},
       email:{type: DataTypes.STRING, allowNull: false},
       from:{type: DataTypes.STRING, allowNull: false},
       to:{type: DataTypes.STRING, allowNull: false},
    })
}