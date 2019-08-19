const NiyonDB = require('../conn');
// const { checkDB } = require('../index');

afterAll(() => {
  NiyonDB.close();
});

// test('should connect successfully', async done => {
//   // expect(sum(3, 4, 5)).toBe(12);
//   try {
//     const status = await checkDB();
//     if (status === 'Failed') {
//       done('Failed to connect');
//     }
//     expect(status).toBe('Success');
//   } catch (error) {
//     done('Failed to connect');
//   }
// });
