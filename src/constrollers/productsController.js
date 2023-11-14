const { Product, Fragance } = require('../db')
const {Op} = require('sequelize')

const getProducts = async () => {

    try {

        const allProducts = await Product.findAll({ 
            include: Fragance
        });

        const cleanProducts = allProducts.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            gender: product.gender,
            replica: product.replica,
            stock: product.stock,
            fragance: product.Fragances.map(fragance => fragance.name)
        }))

        return cleanProducts;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getProductById = async (id) => {

    try {
        
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Fragance,
                }        
            ]
        })

        const productArr = [product]

        const cleanProducts = productArr.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            gender: product.gender,
            replica: product.replica,
            stock: product.stock,
            fragance: product.Fragances.map(fragance => fragance.name)
        }))

        return cleanProducts;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

const postProduct = async (name, description, price, image, gender, replica, stock, fragance) => {

    try {

        const newProduct = await Product.create({
            name, description, price, image, gender, replica, stock, fragance
        });

        if (fragance) {
            const selectedFragance = await Fragance.findAll({
                where: {
                    id: fragance
                }
            });

            await newProduct.addFragances(selectedFragance);
        }

        return newProduct;

    } catch (error) {
        throw new Error(error.message);
    }

};

const putProducts = async (id) => {

    try {
        
        const product = await Product.findByPk(id);

        return product;

    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProducts = async () => {

    try {
        
        return await Product.destroy({
            where: {}
        });

    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductByName = async (name) => {
    try {
        
        return await Product.destroy({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

const searchByName = async (name) => {

    try {
        
        return await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        }) 

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { postProduct, getProducts, putProducts, deleteProducts, deleteProductByName, getProductById, searchByName };