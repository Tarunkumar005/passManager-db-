const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

//express
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

//dotenv
dotenv.config()
console.log(process.env.MONGO_URI)

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();//connects to url

// Database Name
const dbName = 'PassManager';

// API for Get Passwords
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

// API for Get Users
app.get('/users', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('users');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

// API for insertion (post)
app.post('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({"success" : "true" , "result" : findResult});
})

// API for insertion (post) Users
app.post('/users', async(req, res) => {
  const user = req.body;
  const db = client.db(dbName);
  const collection = db.collection('users');
  const findResult = await collection.insertOne(user)
  res.send({"success" : "true" , "result" : findResult});
})


// API for deletion (Delete)
app.delete('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({"success" : "true" , "result" : findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
})