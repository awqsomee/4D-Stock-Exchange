class balanceService {
  replenish(user, replenish) {
    user.balance += replenish;
    return user;
  }

  withdraw(user, withdraw) {
    if (user.balance >= withdraw) {
      user.balance -= withdraw;
      console.log('user.balance');
    } else {
      throw 'Not enough money';
    }
  }
}

module.exports = new balanceService();
