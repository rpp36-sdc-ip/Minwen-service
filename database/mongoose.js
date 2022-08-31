
const mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({

  product_id: {
    type: Number, required: true, sparse: true
  },
  review_id: {
    type: Number, required: true, unique: true, sparse: true
  },
  rating: {
    type: Number, min: 1, max: 5
  },
  summary: {
    type: String, maxLength: 60
  },
  recommend: Boolean,
  body: {
    type: String, required: true, minLength: 50, maxLength: 1000
  },
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [{
    id: {
      type: Number, required: true, unique: true
    },
    url: String
  }]
});

let metaSchema = mongoose.Schema({
  product_id: {
    type: Number, required: true, unique: true, sparse: true
  },
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  recommend: {
    false: Number,
    true: Number
  },
  characteristics: {
    size: {
      id: {
        type: Number, required: true
      },
      value: Number
    },
    width: {
      id: {
        type: Number, required: true
      },
      value: Number
    },
    comfort: {
      id: {
        type: Number, required: true
      },
      value: Number
    },
    quality: {
      id: {
        type: Number, required: true
      },
      value: Number
    },
    length: {
      id: {
        type: Number, required: true
      },
      value: Number
    },
    fit: {
      id: {
        type: Number, required: true
      },
      value: Number
    },
  }
})