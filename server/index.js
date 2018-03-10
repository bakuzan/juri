'use strict';

const Constants = require('./constants');
const app = require('./app');

const PORT =
  process.env.NODE_ENV === Constants.environment.production
    ? process.env.PORT
    : 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
