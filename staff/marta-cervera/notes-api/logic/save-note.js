const { validateId, validateText, validateTags, validateVisibility, validateCallback } = require('./helpers/validations')
const { context } = require('./context')
const { env: { DB_NAME } } = process



module.exports = function (noteId, text, tags, ownerId, visibility, callback) {
    
    if (typeof noteId !== 'undefined') validateId(noteId)
    validateText(text)
    validateTags(tags)
    validateId(ownerId)
    validateVisibility(visibility)
    validateCallback(callback)
    
   
    const { connection } = this

    const db = connection.db(DB_NAME)

    const notes = db.collection('notes')
    
        notes.findOne({ noteId }, (error, notes) => {
            if (error) {
                done()

                return callback(error);

            } 
            if (notes) {
                console.log(note, '2')

                return callback(new Error(`noteId ${noteId} registered`))
                
            }

            note = { ownerId, noteId, text, tag, visibility }

                
                notes.insertOne(users, (error, result) => {
                    if (error) {
                        done()

                        return callback(error)
                    }
                    done()
                }) 

            })
            
    
            
        }
    
    


