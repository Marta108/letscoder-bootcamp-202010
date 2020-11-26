require('dotenv').config()

const { expect } = require('chai')
const { MongoClient, ObjectId } = require('mongodb')
const { randomStringWithPrefix, randomWithPrefixAndSuffix, randomNonString, randomEmptyOrBlankString } = require('../utils/randoms')
const context = require('./context')
const retrieveUser = require('./authenticate-user')

const { env: { MONGODB_URL, DB_NAME } } = process


describe('retrieveUser()', () => {

    let client, db, users

    before(done => {
        client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true })

        client.connect((error, connection) => {
            if (error) return done(error)

            context.connection = connection

            db = connection.db(DB_NAME)

            users = db.collection('users')

            done()
        })
    })


describe('when user already exists', () => {
    let userId, fullname, email, password

    beforeEach( done => {
        fullname = `${randomStringWithPrefix('name')} ${randomStringWithPrefix('surname')}`
            email = randomWithPrefixAndSuffix('email', '@mail.com')
            password = randomStringWithPrefix('password')

            const user = { fullname, email, password }

            users.insertOne(user, (error, result) => {
                if (error) return done(error)

                userId = result.insertedId.toString()

                done()
    })
    })
    it ('should suceed on correct userId', done =>{
        retrieveUser(userId, (error, user) =>{
            expect(error).to.be.null

            expect(user.fullname).to.equal(fullname)
            expect(user.email).to.equal(email)
            done()
        })
    })
    it('should fail when user Id it is not the same', done =>{
        // Must be 12 characters long because mongo ObjectId requires a 12 character string
            // or a string of 24 hex characters
            const wrongUserIdwith12Characters = `wrong${Math.random().toFixed(5)}`
            retrieveUser(wrongUserIdwith12Characters, (error, user) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongUserIdwith12Characters} not found`)
                expect(user).to.be.undefined               

                done()
            })
    })
    afterEach( done => {
        users.deleteOne( { _id:ObjectId(userId)}, (error, result) =>{
            if (error) return done(error)
            expect(result.deletedCount).to.equal(1)
        })
    })
    describe('when user does not exist (but existed before)', () => {
        let fullname, email, password

        beforeEach(done => {
            fullname = `${randomStringWithPrefix('name')} ${randomStringWithPrefix('surname')}`
            email = randomWithPrefixAndSuffix('email', '@mail.com')
            password = randomStringWithPrefix('password')

            const user = { fullname, email, password }

            users.insertOne(user,(error, result) => {
                if (error) return done(error)

                userId = result.insertedId.toString()
                users.deleteOne({user}, (error) => {
                    if (error) return done(error)
                    expect(result.deletedCount).to.equal(1)   
                    
                }) 

                done()
            })

        })

        it('it should fail on a right userId', done => {
           retrieveUser(userId, (error, user) => {
                expect(error).to.be.instanceOf(Error) 
                expect(user).to.be.undefined
                expect(error.message).to.equal(`The user with id ${userId} was not found`)

                done()
            })
        })
    })
})
})