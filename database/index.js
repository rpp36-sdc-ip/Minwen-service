const { Client } = require('pg');

const client = new Client({
  //host: 'localhost',
  host: 'ec2-3-93-58-133.compute-1.amazonaws.com',
  user: 'newuser',
  //user: 'postgres',
  port: 5432,
  password: 'password',
  database: 'sdc_reviews'
});

client.connect();


// client.on('error', (err, client) => {
//   console.error('db connection err', err);

// });


const getReviews = function (value, sort, count, page, callback) {
  //console.log(sort);
  let sortDesc;
  //const queryString = `select * from reviews where product_id = ${value}`;
  if (sort === 'relevant') {
    sortDesc = 'recommend DESC';
  } else if (sort === 'newest') {
    sortDesc = 'date DESC';
  } else if (sort === 'helpful') {
    sortDesc = 'helpfulness DESC';
  }
  console.log('here', sortDesc);
  console.log(value);
  let offset = page === 0 ? 0 : (page - 1) * count;
  let queryString = `SELECT id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
  FROM reviews where product_id = ${value} AND reported=false ORDER BY ${sortDesc}`;
  console.log(queryString);
  client.query(queryString, async (err, result) => {
    if (err) {
      console.log('Err from performing the query string ', err);
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
  //console.log(value);
  const queryString = `UPDATE reviews SET reported = true WHERE id=${value};`;

  client.query(queryString, (err, result) => {
    if (err) {
      console.log('Err from performing the query string ');
      callback(err);
    } else {
      //console.log(result);
      callback(null, result);
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
      callback(null, 'successful');
    }
    client.end;
  });
};

const postReviews = function (product_id, rating, summary, date, body, recommend, name, email, characteristics, callback) {
  console.log(product_id, rating, summary, date, body, recommend, name, email, characteristics);
  const queryString = `INSERT INTO reviews (product_id, rating, summary, date, body, recommend, reviewer_name, reviewer_email,reported)
  VALUES (${product_id}, ${rating}, '${summary}', ${date},'${body}', ${recommend},'${name}','${email}',  false) RETURNING id;`;

  client.query(queryString, async (err, result) => {
    if (err) {
      console.log('Err from performing the query string ' + err);
      callback(err);
    } else {
      const review_id = result.rows[0].id;

      //console.log(review_id);
      const resultOfChar = await Promise.resolve(postCharacteristic(review_id, characteristics));
      console.log(resultOfChar);
      if (resultOfChar) {
        //console.log('wait here');
        callback(null, result);
      } else {
        callback(null, result);
      }
    }
    client.end;
  });
};

const postCharacteristic = async function (review_id, characteristics) {
  var work = [];
  // console.log(review_id, characteristics);
  for (var key in characteristics) {
    // console.log(key, characteristics[key]);
    const queryStringOfChar = `INSERT INTO characteristic_reviews (characteristic_id, review_id,value) VALUES (${key},${review_id},${characteristics[key]})`;
    await client.query(queryStringOfChar)
      .then((res) => {
        work.push(res.command);
      })
      .catch((err) => {
        throw err;
      })
  }
  if (work.length === 4) {
    return true;
  }
};


module.exports = {
  getReviews,
  getMeta,
  putReport,
  putHelpful,
  postReviews
};