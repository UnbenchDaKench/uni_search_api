const bcrypt = require("bcrypt")
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.login = (req, res) => {
    User.find({email: req.body.email })
        .exec()
        .then(user => {
            console.log(user)
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth faileds"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, hash) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (hash) {
                    const token = jwt.sign({
                        email: user[0].email
                    },
                    process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                )
                return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                    username: user[0].username,
                    nationality: user[0].nationality,
                    userId: user[0]._id
                })
            }
                else {

                    res.status(401).json({
                        messgae: "Auth failed"
                    })
                }
            })
})
        .catch (err => {
    res.status(500).json({
        error: err
    })
})
}
exports.signup = (req, res) => {
    //validating request
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail already exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({

                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            nationality: req.body.nationality
                        })
                        user.save().then(data => {
                            res.send(data);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message
                            })
                        })
                    }

                })

            }
        })

};

exports.findAll = (req, res) => {
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

}

exports.findOne = (req, res) => {
    console.log(req.params.userId)
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true}).
    then(user => {
        if (!user) {
            return res.status(404).send({
                message: "user not found" + req.params.userId
            })
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id" + req.params.userId
            })
        }
        return res.status(500).send({
            message: "Error retrieving user with id" + req.params.userId
        })
    })

}

exports.deleteOne = (req, res) => {
    User.findByIdAndRemove(req.params.userId).then(res => {
        console.log(res)
    })
}


