require('dotenv').config()

const { MongoClient }= require('mongodb')
const context = require('./context')
const findUsers = require('./find-users')
const saveNote = require('./save-note')

const { env :{ MONGODB_URL }}= process

const client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true })

client.connect() 
.then(connection => {
    context.connection = connection

    return findUsers('marcos')

})
   .then(console.log)
   .catch(console.error)
   .then(() => client.close())
   .catch(console.error)