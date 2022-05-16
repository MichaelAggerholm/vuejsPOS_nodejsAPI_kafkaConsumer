
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
// Require kafkajs
const { Kafka } = require('kafkajs')

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
})

// Sender produkter til vuePOS app
app.get('/products', (req, res) => {
  let rawdata = fs.readFileSync('products.json');
  let products = JSON.parse(rawdata);

  res.send(products)
})

// Setting up kafka
const kafka = new Kafka({
  // Navnet på den/dem vi modtager data fra.
  clientId: 'vuePOS',
  // Sti til dem som vi modtager data fra, 9092 er defineret i docker-compose kafka filen
  //brokers: ['localhost:9092'],
  brokers: ['localhost:9092'],
})

// Create producer
const producer = kafka.producer()

// Connect to kafka broker
producer.connect()

// post ( Skal formegentligt stå i bunden, lige over listen)
app.post("/", async function(req, res) {
  // Produce a message to kafka
  console.log(JSON.stringify(req.body));
  await producer.send({
    topic: 'pos-datalake',
      messages: [
        // Message = body data fra vores request
        { value: JSON.stringify(req.body)},
      ],
  })
  res.send('Success')
})

// Listen ( Skal formegentligt stå i bunden)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
