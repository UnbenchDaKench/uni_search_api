module.exports = (app) => {
    const user = require('../controllers/user.controller.js')
    const collection = require('../controllers/collection.controllers')

    app.post('/user/signup', user.signup)

    app.post('/user/login', user.login)

    app.get('/user/signup', user.findAll);

    app.post('/user/:userId', user.findOne)

    app.post('/collection/:userId', collection.create)

    app.get('/collection/:userId', collection.find)

    app.delete('/collection/:userId/:collectionId', collection.deleteOne)

    app.delete('/user/:userId', user.deleteOne)




}