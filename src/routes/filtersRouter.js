const { Router } = require("express");
const {orderName, orderPrice, filterByGender} = require('../constrollers/filtersController');
const router = Router();

router.get('/orderName/:order?', orderName);
router.get('/orderPrice/:order?', orderPrice);
router.get('/gender/:gender', filterByGender)
router.get('/replica/:replica')

module.exports = router;