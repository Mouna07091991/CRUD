const router = require("express").Router()
const mongoose = require("mongoose")

const User = require("../models/user")
mongoose.connect("mongodb://localhost:27017/architectureDb", {useNewUrlParser: true})
const UserModel = mongoose.model("users",User)

router.get("/all", async(req,res)=> {
    const result = await UserModel.find({}, {todos: 1}).exec();
    res.send(result);
})

router.post("/add/:id", async(req,res)=> {
    const result = await UserModel.findOneAndUpdate({"_id": req.params.id}, { $push: {"todos": req.body}}).exec();
    res.send(result);
})



router.post("/update/:id/:i", async(req,res)=> {
    var x = mongoose.Types.ObjectId(req.params.i);
    const result = await UserModel.findOneAndUpdate(
        {"_id": req.params.id}, 
        { $set: { "todos.$[elem].desc" : req.body.desc } },
        { arrayFilters: [ { "elem._id": x} 
    ] }
    ).exec();
    res.send(result);
})

router.post("/delete/:id/:todoId", async (req,res)=>{
    var index=  req.params.index;
    const result = 
    await UserModel.findOneAndUpdate(
        {_id: req.params.id},
         {$pull: {
             "todos": {_id: req.params.todoId}}}
             
        ).exec();
   
    res.send("ok");
})

module.exports = router;