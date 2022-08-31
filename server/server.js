const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');


const port = 3002;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/reviews', (req, res) => {
  db.test((err, result) => {
    if (err) {
      console.log('Get data from database failed ');
      //res.status(500).send('Get data from database failed');
    } else {
      console.log(result);
      //res.status(200).send(result);
    }
  });
  res.status(200).send("Get Sucessfully ");
});

// app.put('/reviews/:review_id/helpful', (req, res) = {
//   res.status(200).send("put Sucessfully ");
// })



app.post('/reviews', (req, res) => {
  res.status(201).send("Post Sucessfully!");
})

app.listen(port, () => {
  console.log(`listening at port ${port}`);
})

module.exports = app;
