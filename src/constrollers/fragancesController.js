const { Product, Fragance } = require('../db')
const {Op} = require('sequelize')

const getFragances = async () => {
    try {

        const allFragances = await Fragance.findAll({
            include: Product
        });

        const cleanFragances = allFragances.map((fragance) => ({
            id: fragance.id,
            name: fragance.name,
            products: fragance.Products.map((product) => ({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                gender: product.gender,
                replica: product.replica,
                stock: product.stock,
            }))
        }))

        return cleanFragances;

    } catch (error) {
        throw new Error('failed to get all fragances');
    }
}

const postFragance = async (name) => {

    try {

        const newFragance = Fragance.create({
            name
        })

        return newFragance;

    } catch (error) {
        throw new Error('Failed to create fragance')
    }

};

const putFragance = async (id) => {

    try {
        
        const fragance = Fragance.findByPk(id);

        return fragance;

    } catch (error) {
        throw new Error('Failed to update fragance')
    }
}

const deleteFragances = async () => {

    try {
        
        return await Fragance.destroy({
            where: {}
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteFraganceByName = async (name) => {

    try {
        
        return await Fragance.destroy({
            where: {
                name: {
                    [Op.iLike] : `%${name}%`
                }
            }
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { postFragance, getFragances, putFragance, deleteFragances, deleteFraganceByName };