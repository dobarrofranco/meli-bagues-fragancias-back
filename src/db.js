require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const ProductModel = require('./models/Product')
const FraganceModel = require('./models/Fragance')

// const sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/products`,
//     { logging: false, native: false }
// );

const sequelize = new Sequelize(DB_DEPLOY,
    { logging: false, native: false }
);

ProductModel(sequelize);
FraganceModel(sequelize);

const { Product, Fragance } = sequelize.models;
// N : 1

Product.belongsToMany(Fragance, {through: 'product_fragance'});
Fragance.belongsToMany(Product, {through: 'product_fragance'});
// Fragance.hasMany(Product)
// Product.belongsTo(Fragance)

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};