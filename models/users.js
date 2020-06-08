const mongoose = require('mongoose');
const crypto = require('crypto')

const salt = crypto.randomBytes(64).toString('hex')
console.log(salt)

console.log('-------------------------------------------')
const password = crypto.pbkdf2Sync("password1", salt, 1000, 64, "sha512").toString('hex')
console.log(password)

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    salt: String

})






mongoose.model('User', userSchema);