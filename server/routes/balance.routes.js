const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const balanceController = require('../controllers/balanceController');

const router = new Router();

router.post('', authMiddleware, balanceController.replenish);
router.get('', authMiddleware, balanceController.getBalance);
router.delete('/', authMiddleware, balanceController.withdraw);

module.exports = router;
