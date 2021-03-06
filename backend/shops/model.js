const { pool } = require('../util/database')

const getShopsFromDb = async categoryid => {
  try {
    const shops = await pool.query(
      `select * from shop JOIN category_shop ON shop.id = category_shop.shop_id AND category_shop.category_id =$1 ORDER BY shop.id;`,
      [categoryid]
    )
    return { shops, error: false }
  } catch (e) {
    return { error: e }
  }
}

const getShopFromDb = async id => {
  try {
    const shop = await pool.query(`SELECT * FROM shop WHERE id=$1`, [id])
    return { shop, error: false }
  } catch (e) {
    return { error: e }
  }
}

// ('select * from shops JOIN categories_join_shops ON shops.shopid = categories_join_shops.shopid AND categories_join_shops.categoryId =1 JOIN categories ON categories_join_shops.categoryid = categories.categoryid;')

// INSERT INTO shops(shopname) VALUES ('Model Medical Store');
// INSERT INTO shops(shopname) VALUES ('Gururaja Medicals');
// INSERT INTO shops(shopname) VALUES ('Kamal Deep Medicals');
// INSERT INTO shops(shopname) VALUES ('Munmun Florist');
// INSERT INTO shops(shopname) VALUES ('Black Tulip Flower International');

module.exports = { getShopsFromDb, getShopFromDb }
