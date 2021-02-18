-- CATEGORIES -- 

CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO categories (name) values ('Groceries & Essentials');
INSERT INTO categories (name) values ('Fruits & Vegetables');
INSERT INTO categories (name) values ('Food Delivery');
INSERT INTO categories (name) values ('Medicines');
INSERT INTO categories (name) values ('Meat & Fish');
INSERT INTO categories (name) values ('Pet Supplies');
INSERT INTO categories (name) values ('Health & Wellness');
INSERT INTO categories (name) values ('Gifts & Lifestyle');


-- SHOPS --

CREATE TABLE IF NOT EXISTS shops (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(255) NOT NULL
);

INSERT INTO shops (name,address) values ('Shoppers Stop','Shoppers Stop,Kannur');
INSERT INTO shops (name) values ('Nilgiris');
INSERT INTO shops (name) values ('Daily Needs');
INSERT INTO shops (name) values ('Shell Select');
INSERT INTO shops (name) values ('M. A. Provision Mart');
INSERT INTO shops (name) values ('FreshFruits');
INSERT INTO shops (name) values ('The Organic World');
INSERT INTO shops (name) values ('Empire Restaurant');
INSERT INTO shops (name) values ('Meghana Foods');
INSERT INTO shops (name) values ('Dindigul Thalappakatti');
INSERT INTO shops (name) values ('Model Medical Store');
INSERT INTO shops (name) values ('Apollo Pharmacy');
INSERT INTO shops (name) values ('Roots Pharmacy');
INSERT INTO shops (name) values ('Nandus Chicken');
INSERT INTO shops (name) values ('Fresh N Choice');
INSERT INTO shops (name) values ('International Dressed Chicken');
INSERT INTO shops (name) values ('K. H Chicken Center');
INSERT INTO shops (name) values ('Heads Up For Tails');
INSERT INTO shops (name) values ('The Pet Project');
INSERT INTO shops (name) values ('Dog My Cats');
INSERT INTO shops (name) values ('Glens BakeHouse');
INSERT INTO shops (name) values ('Model Medical Store');
INSERT INTO shops (name) values ('Gururaja Medicals');
INSERT INTO shops (name) values ('Kamal Deep Medicals');
INSERT INTO shops (name) values ('Munmun Florist');
INSERT INTO shops (name) values ('Black Tulip Flower International');
INSERT INTO shops (name) values ('Glenands Pet Store');
INSERT INTO shops (name) values ('Shoppers Stop');


-- CATEGORIES JOIN SHOPS --

CREATE TABLE IF NOT EXISTS category_shop (
  categoryid BIGINT,
  shopid BIGINT
);

INSERT INTO category_shop (shopid,categoryid) values (1,1);
INSERT INTO category_shop (shopid,categoryid) values (2,1);
INSERT INTO category_shop (shopid,categoryid) values (3,1);
INSERT INTO category_shop (shopid,categoryid) values (4,1);
INSERT INTO category_shop (shopid,categoryid) values (5,1);
INSERT INTO category_shop (shopid,categoryid) values (1,2);
INSERT INTO category_shop (shopid,categoryid) values (2,2);
INSERT INTO category_shop (shopid,categoryid) values (6,2);
INSERT INTO category_shop (shopid,categoryid) values (5,2);
INSERT INTO category_shop (shopid,categoryid) values (3,2);
INSERT INTO category_shop (shopid,categoryid) values (7,2);
INSERT INTO category_shop (shopid,categoryid) values (8,3);
INSERT INTO category_shop (shopid,categoryid) values (9,3);
INSERT INTO category_shop (shopid,categoryid) values (10,3);
INSERT INTO category_shop (shopid,categoryid) values (21,3);
INSERT INTO category_shop (shopid,categoryid) values (11,4);
INSERT INTO category_shop (shopid,categoryid) values (12,4);
INSERT INTO category_shop (shopid,categoryid) values (13,4);
INSERT INTO category_shop (shopid,categoryid) values (14,5);
INSERT INTO category_shop (shopid,categoryid) values (15,5);
INSERT INTO category_shop (shopid,categoryid) values (16,5);
INSERT INTO category_shop (shopid,categoryid) values (17,5);
INSERT INTO category_shop (shopid,categoryid) values (18,6);
INSERT INTO category_shop (shopid,categoryid) values (19,6);
INSERT INTO category_shop (shopid,categoryid) values (20,6);
INSERT INTO category_shop (shopid,categoryid) values (27,6);
INSERT INTO category_shop (shopid,categoryid) values (22,7);
INSERT INTO category_shop (shopid,categoryid) values (23,7);
INSERT INTO category_shop (shopid,categoryid) values (24,7);
INSERT INTO category_shop (shopid,categoryid) values (25,8);
INSERT INTO category_shop (shopid,categoryid) values (26,8);


-- DELIVERY GUYS -- 


CREATE TABLE IF NOT EXISTS deliveryguy (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password varchar(255) NOT NULL
);



-- ITEMS --


CREATE TABLE IF NOT EXISTS items (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subcategory VARCHAR(150) NOT NULL,
  description VARCHAR(100) NOT NULL,
  price NUMERIC NOT NULL,
  quantity BIGINT NOT NULL,
  shopid BIGINT NOT NULL
);

INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Bread','Breakfast & Diary','400gms',34.99,100,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Cheese Slices','Breakfast & Diary','10 slices',99.99,30,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Eggs','Breakfast & Diary','6 Eggs',49,54,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Milk','Breakfast & Diary','50ml',27,150,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Sugar','Provisions','1Kg',49.99,47,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Cocunut Milk','Provisions','50Ml',54.99,10,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Split Cashew','Provisions','200Gms',159.99,45,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Red Rajma','Provisions','500Gms',89.99,29,1);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Bread','Breakfast & Diary','400gms',33.99,100,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Cheese Slices','Breakfast & Diary','10 slices',99.99,30,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Eggs','Breakfast & Diary','6 Eggs',49.99,54,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Milk','Breakfast & Diary','50ml',27.50,150,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Sugar','Provisions','1Kg',49.99,47.99,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Cocunut Milk','Provisions','50Ml',53.99,10,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Split Cashew','Provisions','200Gms',160.99,45,2);
INSERT INTO items (name,subcategory,description,price,quantity,shopid) values ('Red Rajma','Provisions','500Gms',88.99,29,2);


-- ORDERS --


CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  userid BIGINT NOT NULL,
  deliverypartnerid BIGINT NOT NULL,
  deliveryaddress VARCHAR(255) NOT NULL,
  shopaddress VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL
);

INSERT INTO orders (userid,deliverypartnerid,deliveryaddress,shopaddress,status) VALUES (,,'','',)


-- USERADDRESSES --


CREATE TABLE IF NOT EXISTS useraddress (
  id BIGSERIAL PRIMARY KEY,
  userid BIGINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL
);

INSERT INTO useraddresses (userid,address,category) VALUES (,'','')



-- USERS --


CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  fullname VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email,fullname,password) VALUES ('','','')

-- CART --

CREATE TABLE IF NOT EXISTS cart (
  id BIGSERIAL PRIMARY KEY,
  quantity BIGINT NOT NULL,
  shopid VARCHAR(150) NOT NULL,
  itemid BIGINT NOT NULL,
  userid BIGINT NOT NULL
);
