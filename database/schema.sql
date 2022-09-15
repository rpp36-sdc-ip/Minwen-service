DROP TABLE IF EXISTS product;

CREATE TABLE product(
  id int PRIMARY KEY,
  name varchar(255),
  slogan varchar(255),
  description varchar(1000),
  category varchar(255),
  default_price int
);

COPY product
from
  '/Users/minwenliu/bootcamp/group_project/product.csv' CSV HEADER;

DROP TABLE IF EXISTS product_review;

CREATE TABLE product_review(
  id int PRIMARY KEY,
  ratingone int,
  ratingtwo int,
  ratingthree int,
  ratingfour int,
  ratingfive int,
  falseOfRecomment int,
  trueOfRecomment int,
  FOREIGN Key (id) REFERENCES product(id)
);

insert into
  product_review(id)
select
  (id)
from
  product;

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews(
id serial int PRIMARY KEY NOT NULL,
  product_id int,
  rating int NOT NULL,
  date text,
  summary varchar(255),
  body varchar(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name varchar(60) NOT NULL,
  reviewer_email varchar(255) NOT NULL,
  response varchar(255),
  helpfulness int,
  FOREIGN Key (product_id) REFERENCES product_review(id)
);

COPY reviews
from
  '/Users/minwenliu/bootcamp/group_project/reviews.csv' CSV HEADER;

DROP TABLE IF EXISTS photos;

CREATE TABLE photos(
  id SERIAL PRIMARY KEY,
  review_id int,
  url varchar(1000),
  FOREIGN Key (review_id) REFERENCES reviews(id)
);

COPY photos
from
  '/Users/minwenliu/bootcamp/group_project/reviews_photos.csv' CSV HEADER;

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id int,
  name varchar(255),
  FOREIGN Key (product_id) REFERENCES product_review(id)
);

COPY characteristics
from
  '/Users/minwenliu/bootcamp/group_project/characteristics.csv' CSV HEADER;

DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id int,
  review_id int,
  value int,
  FOREIGN Key (review_id) REFERENCES reviews(id),
  FOREIGN Key (characteristic_id) REFERENCES characteristics(id)
);

COPY characteristic_reviews
from
  '/Users/minwenliu/bootcamp/group_project/characteristic_reviews.csv' CSV HEADER;