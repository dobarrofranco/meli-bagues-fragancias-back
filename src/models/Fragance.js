const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'Fragance', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { 
            timestamps: false,
            paranoid: true,
            deletedAt: 'deletedAt',
        }
    )
}