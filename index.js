require('dotenv').config();
const server = require('./server');

const PORT = process.env.PORT || 5000;

const serverVar = server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  console.log(process.env.NODE_ENV);
});

function sum(...numbers) {
  // eslint-disable-next-line no-restricted-globals
  if (numbers.every(n => typeof n === 'number' && !isNaN(n))) {
    return numbers.reduce((acc, item) => acc + item, 0);
  }
  throw Error('Contains invalid number');
}

module.exports = {
  sum,
  serverVar
};
