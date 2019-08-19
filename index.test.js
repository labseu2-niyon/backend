const { sum } = require('./index');

test('should return sum of two numbers', () => {
  expect(sum(3, 5)).toBe(8);
});

test('should return sum of three numbers', () => {
  expect(sum(3, 4, 5)).toBe(12);
});

test('should return sum of spread array of numbers', () => {
  expect(sum(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(55);
});
test('should return 0 when only zeroes are passed in', () => {
  expect(sum(...[0, 0, 0, 0, 0, 0])).toBe(0);
});

test('should throw when passed non-number arguments', () => {
  expect(() => {
    sum(2, '4');
  }).toThrow('Contains invalid number');
});

test('should throw when passed non-number arguments in a spread array', () => {
  expect(() => {
    sum(...[1, 2, NaN, 4, 5, 6]);
  }).toThrow('Contains invalid number');
});
