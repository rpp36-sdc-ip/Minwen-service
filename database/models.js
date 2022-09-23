const db = require('../database/index.js');


const listReviews = (params, callback) => {

  const product_id = params.product_id;
  const reviewList = {};
  const resultObj = {};
  const sort = params.sort;
  const count = params.count;
  const page = params.page;

  db.getReviews(product_id, sort, count, page, (err, result) => {
    if (err) {
      console.log("Err from getRevies");
      callback(err);
    } else {
      // console.log('check', result);
      if (result.length > 0) {
        //console.log('list review model successed!');
        reviewList.product = product_id.toString();
        reviewList.page = params.page;
        reviewList.count = params.count;
        reviewList.results = [];
        for (var i = 0; i < result.length; i++) {
          reviewList.results[i] = {};
          reviewList.results[i].review_id = result[i].review_id;
          reviewList.results[i].rating = result[i].rating;
          reviewList.results[i].summary = result[i].summary;
          reviewList.results[i].recommend = result[i].recommend;
          reviewList.results[i].response = result[i].response;
          reviewList.results[i].body = result[i].body;
          reviewList.results[i].date = new Date(Number(result[i].date));
          reviewList.results[i].reviewer_name = result[i].reviewer_name;
          reviewList.results[i].helpfulness = result[i].helpfulness;
          reviewList.results[i].photos = [];
          //console.log(result[i].photo);
          for (var j = 0; j < result[i].photo.length; j++) {
            reviewList.results[i].photos.push(result[i].photo[j]);
          }

          //console.log(reviewList.results[i].review_id, reviewList.results[i].photos);
          //console.log(reviewList.results[i].photos);
          reviewList.results.push(reviewList.results[i]);
          //console.log(reviewList.results[0].photos);
        }
      } else {
        callback(null, reviewList);
      }
    }

    if (Object.keys(result).length !== 0) {
      //console.log('result', reviewList.results[0].photos[0]);
      callback(null, reviewList);
    }
  });
}


const getMetadata = function (productId, callback) {
  const product_id = productId;
  // console.log(product_id);
  const metaData = {};
  if (product_id === '0') {
    metaData.product_id = product_id;
    metaData.ratings = {};
    metaData.recommended = {};
    metaData.characteristics = {};
    callback(null, metaData);
  } else {

    metaData.product_id = product_id;
    metaData.ratings = {};
    metaData.ratings['1'] = 0;
    metaData.ratings['2'] = 0;
    metaData.ratings['3'] = 0;
    metaData.ratings['4'] = 0;
    metaData.ratings['5'] = 0;
    metaData.recommended = {};
    metaData.recommended.false = 0;
    metaData.recommended.true = 0;
    metaData.characteristics = {};
    metaData.characteristics['Fit'] = {};
    metaData.characteristics['Length'] = {};
    metaData.characteristics['Comfort'] = {};
    metaData.characteristics['Quality'] = {};

    db.getMeta(product_id, (err, result) => {
      if (err) {
        console.log("Err from getMeta");
        callback(err);
      } else {
        //console.log(result);
        for (var i = 0; i < result.length; i++) {
          if (result[i].rating === 1) {
            metaData.ratings['1']++;
          }
          if (result[i].rating === 2) {
            metaData.ratings['2']++;
          }
          if (result[i].rating === 3) {
            metaData.ratings['3']++;
          }
          if (result[i].rating === 4) {
            metaData.ratings['4']++;
          }
          if (result[i].rating === 5) {
            metaData.ratings['5']++;
          }
          if (result[i].recommend === false) {
            metaData.recommended[false]++;
          }
          if (result[i].recommend === true) {
            metaData.recommended[true]++;
          }
          if (result[i].name === 'Fit') {
            metaData.characteristics['Fit'].id = result[i].characteristic_id;
            metaData.characteristics['Fit'].value = result[i].value;
          }
          if (result[i].name === 'Length') {
            metaData.characteristics['Length'].id = result[i].characteristic_id;
            metaData.characteristics['Length'].value = result[i].value;
          }
          if (result[i].name === 'Comfort') {
            metaData.characteristics['Comfort'].id = result[i].characteristic_id;
            metaData.characteristics['Comfort'].value = result[i].value;
          }
          if (result[i].name === 'Quality') {
            metaData.characteristics['Quality'].id = result[i].characteristic_id;
            metaData.characteristics['Quality'].value = result[i].value;
          }
        }
      }
      for (var key in metaData.ratings) {
        metaData.ratings[key] = metaData.ratings[key].toString();
      }
      for (var key in metaData.recommended) {
        metaData.recommended[key] = metaData.recommended[key].toString();
      }
      for (var key in metaData.characteristics) {
        var value = metaData.characteristics[key].value;
        //value = value.toString() || '';
        if (value !== undefined) {
          value = value.toString();
        }
        //console.log(value);
        metaData.characteristics[key].value = value;
      }
      callback(null, metaData);
    });
  }

};

const addReview = function (insert, callback) {
  //console.log(body);
  //console.log(insert);
  const product_id = insert.product_id;
  const rating = insert.rating;
  const summary = insert.summary;
  const date = new Date().getTime();
  const body = insert.body;
  const recommend = insert.recommend;
  const name = insert.name;
  const email = insert.email;
  const characteristics = {};
  for (var key in insert.characteristics) {
    characteristics[key] = insert.characteristics[key];
  }

  //console.log(product_id, rating, summary, date, body, recommend, name, email, characteristics);

  db.postReviews(product_id, rating, summary, date, body, recommend, name, email, characteristics, (err, result) => {
    if (err) {
      console.log("Err from post reviews");
      callback(err);
    } else {
      //console.log(result);
      callback(null, result);
    }
  });
};

const helpful = function (input, callback) {
  const reviewId = input;
  console.log(reviewId);
  db.putHelpful(reviewId, (err, result) => {
    if (err) {
      console.log("Err from putHelpful");
      callback(err);
    } else {
      callback(null, result);
    }
  })
};

const report = function (input, callback) {
  const reviewId = input;
  //console.log(reviewId);
  db.putReport(reviewId, (err, result) => {
    if (err) {
      console.log("Err from putReport");
      callback(err);
    } else {
      callback(null, result);
    }
  })
};

module.exports = {
  listReviews,
  getMetadata,
  addReview,
  helpful,
  report
};