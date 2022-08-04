const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/reviews', (req, res) => {
  res.status(200).send("Get Sucessfully ");
})

app.post('/reviews', (req, res) => {
  res.status(201).send("Post Sucessfully!");
})
app.listen(port, () => {
  console.log(`listening at port ${port}`);
})

module.exports = app;
