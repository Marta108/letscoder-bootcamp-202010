const { validateId } = require('./helpers/validations')
const context = require('./context')
const { ObjectId } = require('mongodb')
const { NotFoundError } = require('../errors')

const { env: { DB_NAME } } = process

module.exports = function (ownerId) {
    validateId(ownerId)    

    const { connection } = this
    
    const db = connection.db(DB_NAME)

    const users = db.collection('users')

    const _id = ObjectId(ownerId)

    return users
        .findOne({ _id })
        .then(user => {
            debugger

            if (!user) throw new NotFoundError(`user with id ${ownerId} not found`)

            const notes = db.collection('notes')

            const owner = _id


            return notes
            
            .find({ owner }, { sort: { date: -1 } }).toArray()

            .then(notes => {

                    notes = notes.map(({ _id, text, tags, visibility, date }) => ({ id: _id.toString(), text, tags, visibility, date }))

                    return notes
                })
        })

}.bind(context)


// USING cursor.each()

// const notes = []

// cursor.each((error, note) => {
//     if (error) return callback(error)

//     if (note) {
//         const { _id, text, tags, visibility, date } = note

//         note = { id: _id.toString(), text, tags, visibility, date }

//         notes.push(note)
//     } else callback(null, notes)
// })

// USING cursor.toArray()
