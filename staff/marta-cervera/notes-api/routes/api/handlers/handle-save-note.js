const { saveNote } = require("../../../logic")

module.exports = (req, res, handleError) => {
    const { headers: { authorization }, body: { noteId, text, tags, visibility} } = req

    res.setHeader("Access-Control-Allow-Origin", '*')

    const ownerId= authorization.replace('Bearer ', '')


    try {
        saveNote(ownerId, noteId, text, tags, visibility, error =>{
            if (error) return handleError(400, error)

            res.status(200).send()
        })
    } catch (error){
        handleError(400,error)

    }

}
//en la navegacion de la app, ya tienes identificado al usuario(retrieve user)
