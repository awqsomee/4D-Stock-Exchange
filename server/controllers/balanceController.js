const User = require('../models/User');
const balanceService = require('../services/balanceService');

class balanceController {
  async replenish(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const { replenish } = req.body;
      if (typeof replenish === 'number' && replenish > 0) {
        balanceService.replenish(user, replenish);
        await user.save();
        return res.json(user);
      } else {
        return res.status(400).json({ message: 'Bad request' });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }
  async getBalance(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      return res.json(user.balance);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
  async withdraw(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const withdraw = Number(req.query.withdraw);
      if (typeof withdraw === 'number' && withdraw > 0) {
        if (user.balance >= withdraw) {
          user.balance -= withdraw;
          await user.save();
          return res.json(user);
        } else {
          return res.status(400).json({ message: 'Not enough money' });
        }
      } else {
        return res.status(400).json({ message: 'Bad request' });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

module.exports = new balanceController();
