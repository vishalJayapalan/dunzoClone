require('dotenv').config()

const { pool } = require('../util/database')

const getItems = async (req, res) => {
  try {
    await pool.query(
      `SELECT * FROM items WHERE shopid = '${req.params.shopid}' ORDER BY subcategory`,
      (error, results) => {
        if (error) throw error
        res.status(200).send(results.rows)
      }
    )
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Bread','Breadfast & Diary','400 Gms',34.99 ,100 ,1 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Cheese Slices','Breadfast & Diary','10 Slices', 99.99, 30 , 1 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Eggs','Breadfast & Diary','6 Eggs', 49 , 54,1 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Milk','Breadfast & Diary','500 Ml', 27 ,150 ,1 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Sugar','Provisions','1 Kg',49.99 ,47 ,1 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Cocunut Milk','Provisions','50 Ml',54.99,10  , 1);
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Split Cashew','Provisions','200 Gms', 160, 45, 1);
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Red Rajma','Provisions','500 Gms', 89.99, 29, 1);
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Bread','Breadfast & Diary','400 Gms',33.99 ,90 ,2 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Cheese Slices','Breadfast & Diary','10 Slices', 99.99, 2 , 2 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Eggs','Breadfast & Diary','6 Eggs', 49.99 , 54,2 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Milk','Breadfast & Diary','500 Ml', 27.5 ,100 ,2 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Sugar','Provisions','1 Kg',47.99 ,56 ,2 );
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Cocunut Milk','Provisions','50 Ml',53.99,20  , 2);
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Split Cashew','Provisions','200 Gms', 170.5, 45, 2);
// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('Red Rajma','Provisions','500 Gms', 87.99, 29, 2);

// INSERT INTO items(itemname,subcategory,itemsize,itemprice,quantity,shopid) VALUES ('','','', , , );

module.exports = { getItems }
