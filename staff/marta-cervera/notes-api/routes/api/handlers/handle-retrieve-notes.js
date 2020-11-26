const { retrieveNotes } = require('../../../logic')

module.exports = (req, res, handleError) => {
    const { headers: { authorization } } = req// previemante el la papp se envia el id, se cy 

    // Bearer <token>
    const userId = authorization.replace('Bearer ', '')

    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        retrieveNotes(userId)
            .then(notes => res.status(200).json(notes))
            .catch(handleError)

            
        
    }catch (error) {
        handleError(error)
    }
}
//porque el id es el id de la nota