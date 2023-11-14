const { Product, Fragance } = require('../db')
const { Op } = require('sequelize');

const orderName = async (req, res) => {

    const { order } = req.params;

    try {
         
        const products = await Product.findAll({
            where: {
                stock: {
                    [Op.ne]: "0" // [Op.ne] significa "not equal"   
                }
            }
        });

        const orderName = products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }

            // Cambiar el orden si es Z-A
            return order === 'Z-A' ? comparison * -1 : comparison;
        });

        return res.status(200).json(orderName);
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

}

const orderPrice = async (req, res) => {
    const { order } = req.params;

    try {
        const products = await Product.findAll({
            where: {
                stock: {
                    [Op.ne]: "0" // [Op.ne] significa "not equal"
                }
            }
        });

        const orderedProducts = products.sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);

            let comparison = 0;

            if (priceA > priceB) {
                comparison = 1;
            } else if (priceA < priceB) {
                comparison = -1;
            }

            // Cambiar el orden si es min-max
            return order === 'min-max' ? comparison : comparison * -1;
        });

        return res.status(200).json(orderedProducts);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const filterByGender = async (req, res) => {
    const { gender } = req.params;

    try {
        // Modificar la consulta para incluir la condición de género y excluir productos con stock igual a "0"
        const products = await Product.findAll({
            where: {
                [Op.and]: [
                    {
                        stock: {
                            [Op.ne]: "0"
                        }
                    },
                    {
                        gender: {
                            [Op.in]: [gender] // Asegurarse de que gender sea 'Masculino' o 'Femenino'
                        }
                    }
                ]
            }
        });

        return res.status(200).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {orderName, orderPrice, filterByGender};