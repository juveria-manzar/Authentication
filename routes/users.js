var express = require('express');
var router = express.Router();

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function({ body }, res, next) {
    if (!Object.values(body).every((val) => val)) {
        return res.send({ message: "All fields are required." })
    }

    if (body.password !== body.password_confirm) {
        return res.send({ message: "Passwords don't match." })
    }

    const user = new User();
    user.firstname = body.first_name.trim();
    user.lastname = body.last_name.trim();
    user.email = body.email.trim();
    user.setPassword(body.password);

    user.save((err, newUser) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(201).json({ message: "Created User", user: newUser })
        }
    })
})

module.exports = router;