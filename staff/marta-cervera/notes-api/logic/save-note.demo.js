require('dotenv').config()

const { MongoClient } = require('mongodb')
const context = require('./context')
const saveNote = require('./save-note')

const { env: { MONGODB_URL }} = process



const client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true})

client.connect((error, connection) =>{
    if (error) return console.error(error)

    context.connection = connection

    try {
        saveNote('5fbab384e7836036a05fa907', undefined, 'Otra notita mas!', ['hello', 'date prisa'], 'private', console.log)
        .then(() => console.log(' note saved'))
        .catch(error => console.error('note could not be saved', error))
        .then(() => client.close())
        .then(() => console.log('connection closed'))
    } catch (error) {
        console.log('validateion error', error)
    }

})