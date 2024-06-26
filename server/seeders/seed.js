const db = require('../config/connection');
const { GenericStock, Currency } = require('../models');
const genericStockSeeds = require("./stockSeeds.json");
const currencySeeds = require("./currencySeeds.json");
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB("GenericStock", "genericstocks");
    await GenericStock.create(genericStockSeeds);

    await cleanDB("CurrencyHistory", "currencyhistories");
    await Currency.create(currencySeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
