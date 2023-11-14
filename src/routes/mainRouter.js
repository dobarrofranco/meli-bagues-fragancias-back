const { Router } = require("express");
const productsRouter = require('./productsRouter')
const fragancesRouter = require('./fragancesRouter')
const adminRouter = require('./adminRouter');
const filterRouter = require('./filtersRouter');

const router = Router();

router.use('/products', productsRouter);
router.use('/fragances', fragancesRouter);
router.use('/admin', adminRouter);
router.use('/filter', filterRouter);

module.exports = router;
