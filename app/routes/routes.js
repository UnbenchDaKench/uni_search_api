module.exports = (app) => {
    const user = require('../controllers/user.controller.js')
    const collection = require('../controllers/collection.controllers')

    app.post('/user/signup', user.signup)

    app.post('/user/login', user.login)

    app.get('/user/signup', user.findAll);

    app.get('/user/:noteId', user.findOne)

    app.post('/collection/:userId', collection.create)



}