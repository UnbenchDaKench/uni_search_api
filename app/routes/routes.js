module.exports = (app) => {
    const user = require('../controllers/user.controller.js')

    app.post('/user/signup', user.signup)

    app.post('/user/login', user.login)

    app.get('/user/signup', user.findAll);

    app.get('/user/:noteId', user.findOne)




}