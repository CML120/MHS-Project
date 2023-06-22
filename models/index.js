const User = require('./User');
const Armor = require('./Armor');

Armor.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Armor };
