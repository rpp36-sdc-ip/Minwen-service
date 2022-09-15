const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const model = require('../database/models.js');


const port = 3002;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/reviews', (req, res) => {
  let params = {
    page: req.query.page || 1,
    count: req.query.count || 5,
    sort: req.query.sort,
    product_id: req.query.product_id
  };
  model.listReviews(params, (err, result) => {
    if (err) {
      //console.log('Get review list from database failed ');
      res.status(500).send('Get data from database failed');
    } else {
      //console.log('from server', result);
      res.status(200).send(result);

    }
  })


});

app.get('/reviews/meta', (req, res) => {
  //console.log(req.url, req.query);
  let product_id = req.query.product_id;
  model.getMetadata(product_id, (err, result) => {
    if (err) {
      //console.log('Get review list from database failed ');
      res.status(500).send('Get meta from database failed');
    } else {
      //console.log('from server', result);
      res.status(200).send(result);
    }
  })
});


app.put('/reviews/:reviewId/report', (req, res) => {
  // res.status(204).send("put report Sucessfully ");
  //console.log(req.params, req.method);
  let review_id = req.params.reviewId;
  model.report(review_id, (err, result) => {
    if (err) {
      res.status(500).send('Put report from database failed');
    } else {
      //console.log('from server', result);
      res.sendStatus(204);
    }
  })
});


app.put('/reviews/:reviewId/helpful', (req, res) => {
  let review_id = req.params.reviewId;
  model.helpful(review_id, (err, result) => {
    if (err) {
      res.status(500).send('Put helpful from database failed');
    } else {
      //console.log('from server', result);
      res.sendStatus(204);
    }
  })
});


app.post('/reviews', (req, res) => {

  model.addReview(req.body, (err, result) => {
    if (err) {
      res.status(500).send('Post reviews from database failed');
    } else {
      //console.log('from server', result);
      res.status(201).send('CREATED');
    }
  })
})

app.listen(port, () => {
  console.log(`listening at port ${port}`);
})

module.exports = app;
