const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'newuser',
  port: 5432,
  password: 'password',
  database: 'sdc_reviews'
});

client.connect();

const test = function (callback) {
  client.query(`select (product_id, summary) from reviews where product_id = 2`, (err, result) => {
    if (!err) {
      console.log(result.rows);
    } else {
      console.log(err.message);
    }
    client.end;
  });
};

//const test = function (callback) {
//select and return  a product_id from reviews where product_id =2,limit 5
//   db.one('select (product_id, summary) from reviews where product_id = 2 limit 5 ;', result)
//     .then((data) => {
//       console.log('DATA:', data.value);
//       callback(null, result);
//     })
//     .catch((error) => {
//       console.log('ERROR:', error)
//     });
// };

module.exports = { test };