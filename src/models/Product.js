const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'Product', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            replica: {
                type: DataTypes.STRING,
                allowNull: false
            },
            stock: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tribute: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        { 
            timestamps: false, 
            paranoid: true,
            deletedAt: 'deletedAt',
        }
    )
}