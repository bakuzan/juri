const TABLE = 'sources';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.removeColumn(TABLE, 'url'))
      .then(() => queryInterface.removeColumn(TABLE, 'dataType'))
      .then(() => queryInterface.removeColumn(TABLE, 'selector'))
      .then(() => queryInterface.renameColumn(TABLE, 'parser', 'itemParser'))
      .then(() =>
        queryInterface.addColumn(TABLE, 'optionsParser', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        })
      )
      .then(() =>
        queryInterface.addColumn(TABLE, 'responseParser', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        })
      )
      .then(() =>
        queryInterface.addColumn(TABLE, 'isPaged', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        })
      );
  },
  down: (queryInterface) => {
    return Promise.resolve()
      .then(() => queryInterface.removeColumn(TABLE, 'isPaged'))
      .then(() => queryInterface.removeColumn(TABLE, 'responseParser'))
      .then(() => queryInterface.removeColumn(TABLE, 'optionsParser'))
      .then(() =>
        // Rename!
        queryInterface.renameColumn(TABLE, 'itemParser', 'parser')
      )
      .then(() =>
        queryInterface.addColumn(TABLE, 'selector', {
          type: Sequelize.STRING,
          allowNull: true
        })
      )
      .then(() =>
        queryInterface.addColumn(TABLE, 'dataType', {
          type: Sequelize.ENUM,
          values: ['text', 'json']
        })
      )
      .then(() =>
        queryInterface.addColumn(TABLE, 'url', {
          type: Sequelize.STRING,
          allowNull: false
        })
      );
  }
};
