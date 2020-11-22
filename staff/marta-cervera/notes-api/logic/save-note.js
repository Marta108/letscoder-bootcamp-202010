const {validateId, validateText, validateTags, validateVisibility ,validateCallback} = require('./helpers/validations')
const context = require('./context')
const { env: { DB_NAME } } = process

module.exports = function (ownerId, noteId, text, tags, visibility, callback) {
    validateId(ownerId) 
  if (typeof noteId !== 'undefined') validateId(noteId) 
    validateText(text)
    validateTags(tags)
    validateVisibility(visibility)
    validateCallback(callback)

    const { connection } = this

    const db = connection.db(DB_NAME)

    const notes = db.collection('notes')

    
        notes.findOne({ noteId }, (error, note) => {
            console.log(noteId, '1')
            if (error) {

                return callback(error)
            }

            if (note) {
                console.log(note, '2')
               
                return callback(new Error(`noteId ${noteId} already registered`))
            }

            note = { ownerId, noteId, text, tags, visibility }

            notes.insertOne(note, (error, note) => {
                console.log(error + 'error')
                if (error) {
                  

                    return callback(error)
                }

              

               return callback (null, note)
            })
        })
    
}.bind(context)
    


