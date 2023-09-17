const db = require('../config/connection');
const { GenericStock } = require('../models');
const genericStockSeeds = require("./stockSeeds.json");
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB("GenericStock", "genericstocks");
    
    await GenericStock.create(genericStockSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
