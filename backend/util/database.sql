-- CATEGORIES -- 

CREATE TABLE IF NOT EXISTS category (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO category (name) values ('Groceries & Essentials');
INSERT INTO category (name) values ('Fruits & Vegetables');
INSERT INTO category (name) values ('Food Delivery');
INSERT INTO category (name) values ('Medicines');
INSERT INTO category (name) values ('Meat & Fish');
INSERT INTO category (name) values ('Pet Supplies');
INSERT INTO category (name) values ('Health & Wellness');
INSERT INTO category (name) values ('Gifts & Lifestyle');


-- SHOPS --

CREATE TABLE IF NOT EXISTS shop (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(255) NOT NULL
);

-- INSERT INTO shop (name,address) values ('Shoppers Stop','Shoppers Stop,Kannur');
INSERT INTO shop (name,address) values ('Nilgiris','Nilgiris, Wellington Street, Richmond Town, Shanthi Nagar, East Zone, Bengaluru, Bangalore North, Bangalore Urban, Karnataka, 560025, India');
INSERT INTO shop (name,address) values ('Daily Needs','Daily Needs, Amruth Nagar Main Road, Amruthnagar, Thanisandra, Yelahanka Zone, Bengaluru, Bangalore North, Bangalore Urban, Karnataka, 560092, India');
INSERT INTO shop (name,address) values ('Heritage Fresh Mart','Heritage Fresh Mart, Subramaniapura Main Road, Seven Hills Layout, Vasanthpura Ward, Bommanahalli Zone, Bengaluru, Bangalore South, Bangalore Urban, Karnataka, 560061, India');
INSERT INTO shop (name) values ('M. A. Provision Mart');
INSERT INTO shop (name) values ('FreshFruits');
INSERT INTO shop (name) values ('The Organic World');
INSERT INTO shop (name) values ('Empire Restaurant');
INSERT INTO shop (name) values ('Meghana Foods');
INSERT INTO shop (name) values ('Dindigul Thalappakatti');
INSERT INTO shop (name) values ('Model Medical Store');
INSERT INTO shop (name) values ('Apollo Pharmacy');
INSERT INTO shop (name) values ('Roots Pharmacy');
INSERT INTO shop (name) values ('Nandus Chicken');
INSERT INTO shop (name) values ('Fresh N Choice');
INSERT INTO shop (name) values ('International Dressed Chicken');
INSERT INTO shop (name) values ('K. H Chicken Center');
INSERT INTO shop (name) values ('Heads Up For Tails');
INSERT INTO shop (name) values ('The Pet Project');
INSERT INTO shop (name) values ('Dog My Cats');
INSERT INTO shop (name) values ('Glens BakeHouse');
INSERT INTO shop (name) values ('Model Medical Store');
INSERT INTO shop (name) values ('Gururaja Medicals');
INSERT INTO shop (name) values ('Kamal Deep Medicals');
INSERT INTO shop (name) values ('Munmun Florist');
INSERT INTO shop (name) values ('Black Tulip Flower International');
INSERT INTO shop (name) values ('Glenands Pet Store');
INSERT INTO shop (name) values ('Shoppers Stop');


-- CATEGORIES JOIN SHOPS --

CREATE TABLE IF NOT EXISTS category_shop (
  category_id BIGINT,
  shop_id BIGINT
);

INSERT INTO category_shop (shop_id,category_id) values (1,1);
INSERT INTO category_shop (shop_id,category_id) values (2,1);
INSERT INTO category_shop (shop_id,category_id) values (3,1);
INSERT INTO category_shop (shop_id,category_id) values (4,1);
INSERT INTO category_shop (shop_id,category_id) values (5,1);
INSERT INTO category_shop (shop_id,category_id) values (1,2);
INSERT INTO category_shop (shop_id,category_id) values (2,2);
INSERT INTO category_shop (shop_id,category_id) values (6,2);
INSERT INTO category_shop (shop_id,category_id) values (5,2);
INSERT INTO category_shop (shop_id,category_id) values (3,2);
INSERT INTO category_shop (shop_id,category_id) values (7,2);
INSERT INTO category_shop (shop_id,category_id) values (8,3);
INSERT INTO category_shop (shop_id,category_id) values (9,3);
INSERT INTO category_shop (shop_id,category_id) values (10,3);
INSERT INTO category_shop (shop_id,category_id) values (21,3);
INSERT INTO category_shop (shop_id,category_id) values (11,4);
INSERT INTO category_shop (shop_id,category_id) values (12,4);
INSERT INTO category_shop (shop_id,category_id) values (13,4);
INSERT INTO category_shop (shop_id,category_id) values (14,5);
INSERT INTO category_shop (shop_id,category_id) values (15,5);
INSERT INTO category_shop (shop_id,category_id) values (16,5);
INSERT INTO category_shop (shop_id,category_id) values (17,5);
INSERT INTO category_shop (shop_id,category_id) values (18,6);
INSERT INTO category_shop (shop_id,category_id) values (19,6);
INSERT INTO category_shop (shop_id,category_id) values (20,6);
INSERT INTO category_shop (shop_id,category_id) values (27,6);
INSERT INTO category_shop (shop_id,category_id) values (22,7);
INSERT INTO category_shop (shop_id,category_id) values (23,7);
INSERT INTO category_shop (shop_id,category_id) values (24,7);
INSERT INTO category_shop (shop_id,category_id) values (25,8);
INSERT INTO category_shop (shop_id,category_id) values (26,8);


-- DELIVERY GUYS -- 


CREATE TABLE IF NOT EXISTS delivery_guy (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password varchar(255) NOT NULL
);



-- ITEMS --


CREATE TABLE IF NOT EXISTS item (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sub_category VARCHAR(150) NOT NULL,
  description VARCHAR(100) NOT NULL,
  price NUMERIC NOT NULL,
  quantity BIGINT NOT NULL,
  shop_id BIGINT NOT NULL
);

INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Bread','Breakfast & Diary','400gms',34.99,100,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Cheese Slices','Breakfast & Diary','10 slices',99.99,30,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Eggs','Breakfast & Diary','6 Eggs',49,54,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Milk','Breakfast & Diary','50ml',27,150,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Sugar','Provisions','1Kg',49.99,47,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Cocunut Milk','Provisions','50Ml',54.99,10,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Split Cashew','Provisions','200Gms',159.99,45,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Red Rajma','Provisions','500Gms',89.99,29,1);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Bread','Breakfast & Diary','400gms',33.99,100,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Cheese Slices','Breakfast & Diary','10 slices',99.99,30,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Eggs','Breakfast & Diary','6 Eggs',49.99,54,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Milk','Breakfast & Diary','50ml',27.50,150,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Sugar','Provisions','1Kg',49.99,47.99,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Cocunut Milk','Provisions','50Ml',53.99,10,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Split Cashew','Provisions','200Gms',160.99,45,2);
INSERT INTO item (name,sub_category,description,price,quantity,shop_id) values ('Red Rajma','Provisions','500Gms',88.99,29,2);


-- ORDERS --


CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  delivery_guy_id BIGINT NOT NULL,
  delivery_address VARCHAR(255) NOT NULL,
  shop_address VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL
);

INSERT INTO order (user_id,delivery_guy_id,delivery_address,shop_address,status) VALUES (,,'','',)


-- USERADDRESSES --


CREATE TABLE IF NOT EXISTS useraddress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL
);

INSERT INTO useraddresses (user_id,address,category) VALUES (,'','')



-- USERS --


CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email,full_name,password) VALUES ('','','')

-- CART --

CREATE TABLE IF NOT EXISTS cart_item (
  id BIGSERIAL PRIMARY KEY,
  item_quantity BIGINT NOT NULL,
  shop_id VARCHAR(150) NOT NULL,
  item_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL
);
