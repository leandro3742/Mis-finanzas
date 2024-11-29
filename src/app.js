const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const { db } = require('./database');

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('', require('./routes'))

app.listen(3000, async () => {
  try {
    await db
    console.log('Connection to the database was successful');
    console.log('Server is running in port 3000 🚀');
  }
  catch (error) {
    console.error('Error connecting to the database: ', error);
  }
});