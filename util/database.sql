-- CATEGORIES -- 

CREATE TABLE IF NOT EXISTS categories (
  categoryid BIGSERIAL PRIMARY KEY,
  categoryname VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO categories (categoryname) values ('Groceries & Essentials');
INSERT INTO categories (categoryname) values ('Fruits & Vegetables');
INSERT INTO categories (categoryname) values ('Food Delivery');
INSERT INTO categories (categoryname) values ('Medicines');
INSERT INTO categories (categoryname) values ('Meat & Fish');
INSERT INTO categories (categoryname) values ('Pet Supplies');
INSERT INTO categories (categoryname) values ('Health & Wellness');
INSERT INTO categories (categoryname) values ('Gifts & Lifestyle');


-- SHOPS --

CREATE TABLE IF NOT EXISTS shops (
  shopid BIGSERIAL PRIMARY KEY,
  shopname VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(255) NOT NULL
);

INSERT INTO shops (shopname,address) values ('Shoppers Stop','Shoppers Stop,Kannur');
INSERT INTO shops (shopname) values ('Nilgiris');
INSERT INTO shops (shopname) values ('Daily Needs');
INSERT INTO shops (shopname) values ('Shell Select');
INSERT INTO shops (shopname) values ('M. A. Provision Mart');
INSERT INTO shops (shopname) values ('FreshFruits');
INSERT INTO shops (shopname) values ('The Organic World');
INSERT INTO shops (shopname) values ('Empire Restaurant');
INSERT INTO shops (shopname) values ('Meghana Foods');
INSERT INTO shops (shopname) values ('Dindigul Thalappakatti');
INSERT INTO shops (shopname) values ('Model Medical Store');
INSERT INTO shops (shopname) values ('Apollo Pharmacy');
INSERT INTO shops (shopname) values ('Roots Pharmacy');
INSERT INTO shops (shopname) values ('Nandus Chicken');
INSERT INTO shops (shopname) values ('Fresh N Choice');
INSERT INTO shops (shopname) values ('International Dressed Chicken');
INSERT INTO shops (shopname) values ('K. H Chicken Center');
INSERT INTO shops (shopname) values ('Heads Up For Tails');
INSERT INTO shops (shopname) values ('The Pet Project');
INSERT INTO shops (shopname) values ('Dog My Cats');
INSERT INTO shops (shopname) values ('Glens BakeHouse');
INSERT INTO shops (shopname) values ('Model Medical Store');
INSERT INTO shops (shopname) values ('Gururaja Medicals');
INSERT INTO shops (shopname) values ('Kamal Deep Medicals');
INSERT INTO shops (shopname) values ('Munmun Florist');
INSERT INTO shops (shopname) values ('Black Tulip Flower International');
INSERT INTO shops (shopname) values ('Glenands Pet Store');
INSERT INTO shops (shopname) values ('Shoppers Stop');


-- CATEGORIES JOIN SHOPS --

CREATE TABLE IF NOT EXISTS category_join_shop (
  categoryid BIGINT,
  shopid BIGINT
);

INSERT INTO category_join_shop (shopid,categoryid) values (1,1);
INSERT INTO category_join_shop (shopid,categoryid) values (2,1);
INSERT INTO category_join_shop (shopid,categoryid) values (3,1);
INSERT INTO category_join_shop (shopid,categoryid) values (4,1);
INSERT INTO category_join_shop (shopid,categoryid) values (5,1);
INSERT INTO category_join_shop (shopid,categoryid) values (1,2);
INSERT INTO category_join_shop (shopid,categoryid) values (2,2);
INSERT INTO category_join_shop (shopid,categoryid) values (6,2);
INSERT INTO category_join_shop (shopid,categoryid) values (5,2);
INSERT INTO category_join_shop (shopid,categoryid) values (3,2);
INSERT INTO category_join_shop (shopid,categoryid) values (7,2);
INSERT INTO category_join_shop (shopid,categoryid) values (8,3);
INSERT INTO category_join_shop (shopid,categoryid) values (9,3);
INSERT INTO category_join_shop (shopid,categoryid) values (10,3);
INSERT INTO category_join_shop (shopid,categoryid) values (21,3);
INSERT INTO category_join_shop (shopid,categoryid) values (11,4);
INSERT INTO category_join_shop (shopid,categoryid) values (12,4);
INSERT INTO category_join_shop (shopid,categoryid) values (13,4);
INSERT INTO category_join_shop (shopid,categoryid) values (14,5);
INSERT INTO category_join_shop (shopid,categoryid) values (15,5);
INSERT INTO category_join_shop (shopid,categoryid) values (16,5);
INSERT INTO category_join_shop (shopid,categoryid) values (17,5);
INSERT INTO category_join_shop (shopid,categoryid) values (18,6);
INSERT INTO category_join_shop (shopid,categoryid) values (19,6);
INSERT INTO category_join_shop (shopid,categoryid) values (20,6);
INSERT INTO category_join_shop (shopid,categoryid) values (27,6);
INSERT INTO category_join_shop (shopid,categoryid) values (22,7);
INSERT INTO category_join_shop (shopid,categoryid) values (23,7);
INSERT INTO category_join_shop (shopid,categoryid) values (24,7);
INSERT INTO category_join_shop (shopid,categoryid) values (25,8);
INSERT INTO category_join_shop (shopid,categoryid) values (26,8);


-- DELIVERY GUYS -- 


CREATE TABLE IF NOT EXISTS deliveryguys (
  deliveryguyid BIGSERIAL PRIMARY KEY,
  deliveryguyname VARCHAR(100) NOT NULL,
  emailid VARCHAR(150) UNIQUE NOT NULL,
  password varchar(255) NOT NULL
);



-- ITEMS --


CREATE TABLE IF NOT EXISTS items (
  itemid BIGSERIAL PRIMARY KEY,
  itemname VARCHAR(100) NOT NULL,
  subcategory VARCHAR(150) NOT NULL,
  itemsize VARCHAR(100) NOT NULL,
  itemprice NUMERIC NOT NULL,
  quantity BIGINT NOT NULL,
  shopid BIGINT NOT NULL
);

INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Bread','Breakfast & Diary','400gms',34.99,100,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Cheese Slices','Breakfast & Diary','10 slices',99.99,30,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Eggs','Breakfast & Diary','6 Eggs',49,54,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Milk','Breakfast & Diary','50ml',27,150,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Sugar','Provisions','1Kg',49.99,47,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Cocunut Milk','Provisions','50Ml',54.99,10,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Split Cashew','Provisions','200Gms',159.99,45,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Red Rajma','Provisions','500Gms',89.99,29,1);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Bread','Breakfast & Diary','400gms',33.99,100,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Cheese Slices','Breakfast & Diary','10 slices',99.99,30,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Eggs','Breakfast & Diary','6 Eggs',49.99,54,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Milk','Breakfast & Diary','50ml',27.50,150,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Sugar','Provisions','1Kg',49.99,47.99,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Cocunut Milk','Provisions','50Ml',53.99,10,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Split Cashew','Provisions','200Gms',160.99,45,2);
INSERT INTO items (itemname,subcategory,itemsize,itemprice,quantity,shopid) values ('Red Rajma','Provisions','500Gms',88.99,29,2);


-- ORDERS --


CREATE TABLE IF NOT EXISTS orders (
  orderid BIGSERIAL PRIMARY KEY,
  userid BIGINT NOT NULL,
  deliverypartnerid BIGINT NOT NULL,
  deliveryaddress VARCHAR(255) NOT NULL,
  shopaddress VARCHAR(255) NOT NULL,
  orderpickedup BOOLEAN NOT NULL,
  delivered BOOLEAN NOT NULL
);

INSERT INTO orders (userid,deliverypartnerid,deliveryaddress,shopaddress,orderpickedup,delivered) VALUES (,,'','','',,)


-- USERADDRESSES --


CREATE TABLE IF NOT EXISTS useraddresses (
  addressid BIGSERIAL PRIMARY KEY,
  userid BIGINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL
);

INSERT INTO useraddresses (userid,address,category) VALUES (,'','')



-- USERS --


CREATE TABLE IF NOT EXISTS users (
  userid BIGSERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  fullname VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email,fullname,password) VALUES ('','','')

-- CART --

CREATE TABLE IF NOT EXISTS cart (
  cartid BIGSERIAL PRIMARY KEY,
  cartitemquantity BIGINT NOT NULL,
  shopname VARCHAR(150) NOT NULL,
  itemid BIGINT NOT NULL,
  itemname VARCHAR(150) NOT NULL,
  userid BIGINT NOT NULL
);
