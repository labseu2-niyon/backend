function sum(...numbers) {
  // eslint-disable-next-line no-restricted-globals
  if (numbers.every(n => typeof n === 'number' && !isNaN(n))) {
    return numbers.reduce((acc, item) => acc + item, 0);
  }
  throw Error('Contains invalid number');
}
const person = {
  name: 'Matt',
  age: 23,
  sex: 'male'
};

module.exports = {
  sum,
  person
};
