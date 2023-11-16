const { Router } = require("express");
const { loginAdmin } = require('../controllers/adminController');
const router = Router();

router.post('/', loginAdmin);

module.exports = router;