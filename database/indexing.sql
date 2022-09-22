CREATE INDEX concurrently 'index_product_id_on_reviews' ON reviews USING btree(product_id);

-- DROP TABLE IF EXISTS product_review;
-- CREATE TABLE product_review(
--   id int PRIMARY KEY,
--   ratingone int,
--   ratingtwo int,
--   ratingthree int,
--   ratingfour int,
--   ratingfive int,
--   falseOfRecomment int,
--   trueOfRecomment int,
--   FOREIGN Key (id) REFERENCES product(id)
-- );
-- insert into
--   product_review(id)
-- select
--   (id)
-- from
--   product;