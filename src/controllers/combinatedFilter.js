const { Product, Fragance } = require('../db')
const { Op } = require('sequelize');

const combinatedFilter = async (req, res) => {
    const { orderName, orderPrice, gender, tribute, fragance } = req.query;

    try {
        let filteredProducts = await Product.findAll({
            where: {
                stock: {
                    [Op.ne]: "0"
                }
            },
            include: {
                model: Fragance,
                where: fragance ? { name: fragance } : null,
                attributes: [],
                required: fragance ? true : false
            }
        });

        // Aplicar filtros
        if (gender) {
            filteredProducts = filteredProducts.filter(product => product.gender === gender);
        }

        if (tribute) {
            filteredProducts = filteredProducts.filter(product => product.tribute === (tribute === 'true'));
        }

        // Aplicar orden
        if (orderName) {
            filteredProducts.sort((a, b) => {
                const valueA = a.name.toUpperCase();
                const valueB = b.name.toUpperCase();
                const comparison = valueA.localeCompare(valueB);
                return orderName === 'A-Z' ? comparison : -comparison;
            });
        }

        if (orderPrice) {
            filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            if (orderPrice === 'max-min') {
                filteredProducts.reverse();
            }
        }

        if (filteredProducts.length === 0) {
            return res.status(404).json({success: false})
        }

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { combinatedFilter };

module.exports = { combinatedFilter }