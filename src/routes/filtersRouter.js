const { Router } = require("express");
const {orderName, orderPrice, filterByGender, filterTribute, filterFragances} = require('../controllers/filtersController');
const { combinatedFilter } = require('../controllers/combinatedFilter');
const router = Router();

router.get('/', combinatedFilter);

router.get('/orderName/:order?', orderName);
router.get('/orderPrice/:order?', orderPrice);
router.get('/gender/:gender', filterByGender);
router.get('/tribute/:tribute', filterTribute);
router.get('/fragance/:fragance', filterFragances);

module.exports = router;