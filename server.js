var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/userdb')
mongoose.connection.on('open', () => {
    console.log('connected to database')

    var UserSchema = new Schema({
        'firstName': { type: String, required: true },
        'lastName': String,
        'age': Number
    })

    var UserModel = mongoose.model('user', UserSchema)
    var user1 = new UserModel({ "firName": "seetha", "lastName": "kumar", "age": 21 })
    user1.save()
    console.log("saved!!!!!")
})