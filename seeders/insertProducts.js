const {Product, Fragance} = require('../src/db');
const data_products = require('./data_products');
const data_fragances = require('./data_fragances');

const insertProducts = async () => {

    try {

        for (let i = 0; i < data_products.length; i++) {
            let productsInfo = {
                name: data_products[i].name,
                description: data_products[i].description,
                price: data_products[i].price.toString(),
                image: data_products[i].image,
                gender: data_products[i].gender,
                replica: data_products[i].replica,
                stock: data_products[i].stock.toString()
            }

            await Product.findOrCreate({
                where: {
                    name: productsInfo.name,
                    description: productsInfo.description,
                    price: productsInfo.price,
                    image: productsInfo.image,
                    gender: productsInfo.gender,
                    replica: productsInfo.replica,
                    stock: productsInfo.stock
                }
            })

        }
        
        for (let i = 0; i < data_fragances.length; i++) {
            let fragancesInfo = {
                name: data_fragances[i].name
            }

            await Fragance.findOrCreate({
                where: {
                    name: fragancesInfo.name,
                }
            })

        }

    } catch (error) {
        console.log(error.message + ' in insert data');
    }

}

module.exports = insertProducts;