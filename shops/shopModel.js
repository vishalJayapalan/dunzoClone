const { pool } = require('../util/database')

const getShops = async (req, res) => {
  const { categoryid } = req.params
  try {
    const shops = await pool.query(
      `select * from shops JOIN categories_join_shops ON shops.shopid = categories_join_shops.shopid AND categories_join_shops.categoryId =${categoryid};`
    )
    res.status(200).send(shops.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

// ('select * from shops JOIN categories_join_shops ON shops.shopid = categories_join_shops.shopid AND categories_join_shops.categoryId =1 JOIN categories ON categories_join_shops.categoryid = categories.categoryid;')

// INSERT INTO shops(shopname) VALUES ('Model Medical Store');
// INSERT INTO shops(shopname) VALUES ('Gururaja Medicals');
// INSERT INTO shops(shopname) VALUES ('Kamal Deep Medicals');
// INSERT INTO shops(shopname) VALUES ('Munmun Florist');
// INSERT INTO shops(shopname) VALUES ('Black Tulip Flower International');

module.exports = { getShops }
