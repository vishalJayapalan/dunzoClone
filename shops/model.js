const { pool } = require('../util/database')

const getShops = async (req, res) => {
  const { categoryid } = req.params
  // console.log('categoryid', categoryid)
  try {
    const shops = await pool.query(
      `select * from shops JOIN categories_join_shops ON shops.shopid = categories_join_shops.shopid AND categories_join_shops.categoryId =${categoryid} ORDER BY shops.shopid;`
    )
    res.status(200).send(shops.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const getShop = async (req, res) => {
  const { shopid } = req.params
  try {
    const shop = await pool.query(`SELECT * FROM shops WHERE shopid=${shopid}`)
    res.status(200).send(shop.rows)
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

module.exports = { getShops, getShop }