require('dotenv').config()

const { MongoClient } = require('mongodb')
const context = require('./context')
const retrieveUser = require('./retrieve-user')

const { env: { MONGODB_URL }} = process

const client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true })

client.connect((error, connection) => {
    if(error) return console.error(error)

    context.connection = connection
    retrieveUser('5fbaa88479bc55146842ead0')
    .then(user => console.log(user))
})