const path = require('path');
const Umzug = require('umzug');

function logUmzugEvent(eventName) {
  return function(name, migration) {
    console.log(`${name} ${eventName}`);
  };
}

function createMigrationContext(sequelize) {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize
    },

    // see: https://github.com/sequelize/umzug/issues/17
    migrations: {
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor, // DataTypes
        function() {
          throw new Error(
            'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
          );
        }
      ],
      path: path.join(__dirname, '..', 'migrations'),
      pattern: /\.js$/
    },

    logging: function() {
      console.log.apply(null, arguments);
    }
  });

  umzug.on('migrating', logUmzugEvent('migrating'));
  umzug.on('migrated', logUmzugEvent('migrated'));
  umzug.on('reverting', logUmzugEvent('reverting'));
  umzug.on('reverted', logUmzugEvent('reverted'));

  return umzug;
}

function cmdStatus(umzug) {
  let result = {};

  return umzug
    .executed()
    .then((executed) => {
      result.executed = executed;
      return umzug.pending();
    })
    .then((pending) => {
      result.pending = pending;
      return result;
    })
    .then(({ executed, pending }) => {
      executed = executed.map((m) => {
        m.name = path.basename(m.file, '.js');
        return m;
      });
      pending = pending.map((m) => {
        m.name = path.basename(m.file, '.js');
        return m;
      });

      const current =
        executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
      const status = {
        current: current,
        executed: executed.map((m) => m.file),
        pending: pending.map((m) => m.file)
      };

      console.log(JSON.stringify(status, null, 2));

      return { executed, pending };
    });
}

module.exports = function cmdMigrate(sequelize) {
  const umzug = createMigrationContext(sequelize);
  return umzug
    .up()
    .then((result) => {
      const doneStr = `Migration DONE`;
      console.log(doneStr);
      console.log('='.repeat(doneStr.length));
    })
    .catch((err) => {
      const errorStr = `Migration ERROR`;
      console.log(errorStr);
      console.log('='.repeat(errorStr.length));
      console.log(err);
      console.log('='.repeat(errorStr.length));
      return umzug.down();
    })
    .then(() => cmdStatus(umzug));
};
