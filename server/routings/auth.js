const router = require("express").Router();
const mongoose = require("mongoose");
const user = require("../models/user")

mongoose.connect("mongodb://localhost:27017/architectureDb", {useNewUrlParser: true})

const UserModel = mongoose.model("users", user);
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const result = await UserModel.findOne({email: req.body.email }).exec();
    if(result) {
        if(result.password === req.body.password){
            const token = jwt.sign({data: result}, 'mypass123')
            res.send({message: "user found", token: token })
        }else {
            res.send({message: "bad password"})
        }
    }else {
        res.send({message: "user not found"})
    }
    res.send(result);
})

module.exports = router;