
import call from "../utils/call";
import { validateToken, validateCallback } from "./helpers/validations";

export default function retrieveNotes( token, callback) {
    validateToken(token)
    validateCallback(callback)

    call('GET', 'http://localhost:4000/api/notes', { Authorization: `Bearer ${token}` },
    '',
    (status, response) =>{
        if (status === 0)
            return callback(new Error('server error'))
        else if (status !== 200) {
            const { error } = JSON.parse(response)

            return callback(new Error(error))

    }

    const notes = JSON.parse(response)
    

    callback(null, notes)
})
}