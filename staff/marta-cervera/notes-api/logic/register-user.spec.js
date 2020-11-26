require('dotenv').config()

const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const { randomStringWithPrefix, randomWithPrefixAndSuffix, randomNonString, randomEmptyOrBlankString } = require('../utils/randoms')
const context = require('./context')
const registerUser = require('./register-user')

const { env: { MONGODB_URL, DB_NAME } } = process

describe('registerUser()', () => {
    let client, db, users

    before(() => {
        client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true })

        return client.connect()
            .then(connection => {

                context.connection = connection

                db = connection.db(DB_NAME)

                users = db.collection('users')


            })
    })

    describe('when user does not exist', () => {
        let fullname, email, password

        beforeEach(() => {
            fullname = `${randomStringWithPrefix('name')} ${randomStringWithPrefix('surname')}`
            email = randomWithPrefixAndSuffix('email', '@mail.com')
            password = randomStringWithPrefix('password')
        })

        it('should succeed on new user', () =>
            registerUser(fullname, email, password)
                .then(() =>
                    users
                        .findOne({ email, password }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.fullname).to.equal(fullname)
                })
        )
        afterEach(() =>
            users
                .deleteOne({ email, password })
                .then(result => expect(result.deletedCount).to.equal(1))
        )

    })



    describe('when user already exists', () => {
        let fullname, email, password

        beforeEach(() => {
            fullname = `${randomStringWithPrefix('name')} ${randomStringWithPrefix('surname')}`
            email = randomWithPrefixAndSuffix('email', '@mail.com')
            password = randomStringWithPrefix('password')

            const user = { fullname, email, password }

            users.insertOne(user)

                .then((result) => {
                    userId = result.insertedId.toString()

                })
        })

        it('should fail on existing user', () => {
            registerUser(fullname, email, password)

        })

        afterEach(() =>
            users.deleteOne({ email, password })
                .then((result) => {
                    
                    expect(result.deletedCount).to.equal(1)


                })
            )

    })

    describe('when any parameter is wrong', () => {
        describe('when fullname is wrong', () => {
            describe('when fullname is not a string', () => {
                let fullname, email, password

                beforeEach(() => {
                    fullname = randomNonString()
                    email = randomWithPrefixAndSuffix('email', '@mail.com')
                    password = randomStringWithPrefix('password')
                })

                it('should fail on an wrong fullname', () => {
                    expect(() => registerUser(fullname, email, password, () => { })).to.throw(TypeError, fullname + ' is not a fullname')
                })
            })

            describe('when fullname is empty or blank', () => {
                let fullname, email, password

                beforeEach(() => {
                    fullname = ''
                    email = randomWithPrefixAndSuffix('email', '@mail.com')
                    password = randomStringWithPrefix('password')
                })

                it('should fail on wrong fullname', () => {
                    expect(() => registerUser(fullname, email, password, () => { })).to.throw(Error, 'fullname is empty or blank')
                })
            })
        })
    })

    after(() => client.close())
})