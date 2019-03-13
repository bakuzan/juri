const TABLE = 'sources';
const COLUMN = 'isActive';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn(TABLE, COLUMN);
  }
};
