const { validateCallback, validateId } = require('./helpers/validations')
const context = require('./context')
const ObjectId = require('mongodb').ObjectId;
const { env: { DB_NAME } } = process


module.exports = function (id, callback) {

    validateCallback(callback)
    validateId(id)

    let o_id = new ObjectId(id)

    const { connection } = this

    const db = connection.db(DB_NAME)

    const users = db.collection('users')

    users.findOne({ "_id": o_id }, (error, user) => {
        if (error) {
            return callback(error)

        } else {
            return callback(null, user)
        }
    })
}.bind(context)