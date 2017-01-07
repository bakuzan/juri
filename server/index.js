'use strict';

const app = require('./app');

const PORT = process.env.SERVER_PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
