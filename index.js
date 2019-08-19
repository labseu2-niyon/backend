require('dotenv').config();
const NiyonDB = require('./conn');

function sum(...numbers) {
  // eslint-disable-next-line no-restricted-globals
  if (numbers.every(n => typeof n === 'number' && !isNaN(n))) {
    return numbers.reduce((acc, item) => acc + item, 0);
  }
  throw Error('Contains invalid number');
}

// Check if DB works
NiyonDB.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sum
};
