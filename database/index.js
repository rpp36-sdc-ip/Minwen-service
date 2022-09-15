const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'newuser',
  port: 5432,
  password: 'password',
  database: 'sdc_reviews'
});

client.connect();


const getReviews = function (value, callback) {
  //const queryString = `select * from reviews where product_id = ${value}`;
  const queryString = `SELECT id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
  FROM reviews where product_id = ${value}`;

  client.query(queryString, async (err, result) => {
    if (err) {
      console.log('Err from performing the query string ');
      callback(err);
    } else {
      const reviews = result.rows;
      //console.log(reviews);

      for (var i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        const review_id = review.review_id;
        review.photo = [];
        const results = await Promise.resolve(getPhotos(review_id));
        review.photo = results;

      }
      callback(null, reviews);
    }
    client.end;
  });
};


const getPhotos = (review_id) => {
  const queryString = `select id, url from photos where review_id = ${review_id}`;
  return client.query(queryString)
    .then((response) => response.rows)
    .catch((error) => {
      console.log(error);
    })
}


const getMeta = function (value, callback) {
  var photos = [];
  //const queryString = `select * from reviews where product_id = ${value}`;
  const queryString = `SELECT * FROM characteristic_reviews JOIN characteristics ON characteristics.id=characteristic_reviews.characteristic_id
   JOIN reviews ON reviews.id = characteristic_reviews.review_id WHERE characteristics.product_id = ${value} `;

  client.query(queryString, async (err, result) => {
    if (err) {
      console.log('Err from performing the query string ');
      callback(err);
    } else {
      callback(null, result.rows);
    }
    client.end;
  });
};

const putReport = function (value, callback) {
  const queryString = `SELECT * FROM characteristic_reviews JOIN characteristics ON characteristics.id=characteristic_reviews.characteristic_id
   JOIN reviews ON reviews.id = characteristic_reviews.review_id WHERE characteristics.product_id = ${value} `;

  client.query(queryString, async (err, result) => {
    if (err) {
      console.log('Err from performing the query string ');
      callback(err);
    } else {
      callback(null, result.rows);
    }
    client.end;
  });
};

const putHelpful = function (value, callback) {
  const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id=${value};`;

  client.query(queryString, (err, result) => {
    if (err) {
      console.log('Err from performing the query string ');
      callback(err);
    } else {
      //console.log(result);
      callback(null, 'succesful');
    }
    client.end;
  });
};

const postReviews = function (product_id, rating, summary, date, body, recommend, name, email, characteristics, callback) {
  const queryString = `INSERT INTO reviews (product_id, rating, summary, date, body, recommend, reviewer_name, reviewer_email,reported)
  VALUES (${product_id}, ${rating}, '${summary}', ${date},'${body}', ${recommend},'${name}','${email}', false) RETURNING id;`;

  client.query(queryString, (err, result) => {
    if (err) {
      console.log('Err from performing the query string ' + err);
      callback(err);
    } else {
      console.log(result);
      //callback(null, 'succesful');
    }
    client.end;
  });
};


module.exports = {
  getReviews,
  getMeta,
  putReport,
  putHelpful,
  postReviews
};