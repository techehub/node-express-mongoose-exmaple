var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/userdb')

var UserSchema = new mongoose.Schema({
    'firstName': { type: String, required: true },
    'lastName': String,
    'age': Number
})

var UserModel = mongoose.model('user', UserSchema)

app.put('/user/:id', async(req, res) => {
    var user = await UserModel.findById(req.params.id).exec()
    user.set(req.body)
    var result = await user.save()
    console.log("res-->", result)
    res.send(result)
})

app.delete('/user/:id', async(req, res) => {
    var result = await UserModel.findByIdAndDelete(req.params.id).exec()
    res.send(result)
})



app.get('/user', async(req, res) => {
    var users = await UserModel.find().exec()
    res.send(users)
})

app.post('/user', (req, res) => {
    var user1 = new UserModel(req.body)
    let p = user1.save()
    p.then(() => {
        res.send("successfull saved ")
    })
    p.catch(() => {
        res.send("could not save!!! ")
    })

})
app.listen(3000)