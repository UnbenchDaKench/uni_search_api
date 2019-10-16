const Collection = require('../models/collectionModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

exports.create = (req, res) => {
    var userId = req.params.userId
    User.findById(userId)
        .then(user => {
            if (user == null) {
                res.status(404).json({
                    message: 'User not found'
                })
            }
            else {


                Collection.findById(userId)
                    .exec()
                    .then(choice => {
                        if (choice == null) {
                            const collection = new Collection({
                                schoolChoices: req.body,
                                _id: req.params.userId,
                                mainId: mongoose.Schema.Types.ObjectId()
                            })
                            collection.save().then(data => {
                                res.send(data)
                            }).catch(err => {
                                res.status(500).send({
                                    message: err.message
                                })
                            })
                        }
                        else {
                            Collection.findByIdAndUpdate(userId,
                                {
                                    $push: { schoolChoices: req.body }
                                },
                                { new: true },
                                function (err, data) {
                                    if (err) {
                                        return res.send(err);
                                    }
                                    return res.send(data)
                                }
                            )

                        }
                    })
                    .catch(error => {
                        res.status(404).send({
                            message: error.message
                        })
                    })
            }

        })
        .catch(error => {
            res.status(500).json({
                message: 'User not found'
            })
        })



}

exports.find = (req, res) => {
    Collection.findById(req.params.userId).then(collection => {
        if (!collection) {
            return res.status(404).send({
                message: "user not found" + req.params.userId
            })
        }
        res.send(collection);
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