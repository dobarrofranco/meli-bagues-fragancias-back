const { Router } = require("express");
const { loginAdmin } = require('../constrollers/adminController');
const router = Router();

router.post('/', loginAdmin);

module.exports = router;