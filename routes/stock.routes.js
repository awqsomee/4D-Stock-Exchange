const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const stockController = require('../controllers/stockController');

const router = new Router();

router.post('', authMiddleware, stockController.buyStock);
router.get('', authMiddleware, stockController.getStocks);
router.delete('/', authMiddleware, stockController.sellStock);

module.exports = router;
