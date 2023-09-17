const db = require('../config/connection');
const { Stock } = require('../models');
const stockSeeds = require('./stockSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Stock', 'stocks');
    
    await Stock.create(stockSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
