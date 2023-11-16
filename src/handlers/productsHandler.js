const { postProduct, getProducts, putProducts, deleteProducts, deleteProductByName, getProductById, searchByName } = require('../controllers/productsController')
const { saveImage } = require('../middlewares/multerConfig');
const cloudinary = require('../middlewares/cloudinary');

const getProductsHandler = async (req, res) => {

    try {

        const allProducts = await getProducts();

        return res.status(200).json(allProducts);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getProductByIdHandler = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await getProductById(id);

        return res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postProductHandler = async (req, res) => {

    const { name, description, price, gender, replica, stock, tribute, fragance } = req.body

    try {

        if (!req.body) {
            return res.status(404).json({ error: 'invalid data' });
        }

        let image = '';

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                image = result.url;
                console.log(result);
                saveImage(req.file);
            } catch (error) {
                console.log(error.message + ' cloudinary error');
            }
        }

        const newProduct = await postProduct(name, description, price, image, gender, replica, stock, tribute, fragance);

        if (newProduct) {
            return res.status(200).json(newProduct);
        } else {
            return res.status(400).json({ error: 'not be possible to create a product' });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putProductsHandler = async (req, res) => {

    const { id } = req.params;
    const updatedData = req.body;

    try {

        const product = await putProducts(id);

        console.log(updatedData);

        console.log(req.file);

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                updatedData.image = result.url;
            } catch (error) {
                console.log(error.message + ' cloudinary error');
            }
        }
        
        await product.update(updatedData);

        if (updatedData.fragance) {
            await product.setFragances(updatedData.fragance);
        }

        return res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const deleteProductsHandler = async (req, res) => {

    try {

        const productsDeleted = deleteProducts();

        return res.status(200).json(productsDeleted);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProductByNameHandler = async (req, res) => {

    const { name } = req.params;

    try {

        const deletedProduct = await deleteProductByName(name);

        if (!deletedProduct) {
            return res.status(404).json({ success: false })
        }

        return res.status(200).json({ success: true })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const searchByNameHandler = async (req, res) => {

    const { name } = req.query;

    try {

        if (!name) {
            return res.status(404).json({message: 'No name provided'});
        } 
        
        const productFind = await searchByName(name)
        
        
        if (productFind.length === 0) {
            return res.status(404).json({message: 'No products available with that name'});
        }

        return res.status(200).json(productFind);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { postProductHandler, getProductsHandler, putProductsHandler, deleteProductsHandler, deleteProductByNameHandler, getProductByIdHandler, searchByNameHandler };