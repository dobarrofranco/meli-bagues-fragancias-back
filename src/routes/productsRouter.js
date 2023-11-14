const { Router } = require("express");
const {upload} = require('../middlewares/multerConfig');
const {postProductHandler, getProductsHandler, putProductsHandler, deleteProductsHandler, deleteProductByNameHandler, getProductByIdHandler, searchByNameHandler} = require('../handlers/productsHandler');

const router = Router();

router.get('/search', searchByNameHandler);

router.get('/', getProductsHandler);

router.get('/:id', getProductByIdHandler);

router.post('/', upload.single('image'), postProductHandler);

router.put('/:id', upload.single('image'), putProductsHandler);

router.delete('/', deleteProductsHandler);

router.delete('/:name', deleteProductByNameHandler);

module.exports = router;
