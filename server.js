const express = require("express")
const bodyparser = require("body-parser")
const app = express()

app.use(bodyparser.json())
 //module multer upload fichier

const user = require("./server/routings/user")
app.use("/users",user);

const auth = require("./server/routings/auth")
app.use("/log",auth);

const todo = require("./server/routings/todo")
app.use("/todo",todo);


app.listen(3000 , err => console.log("3000"))