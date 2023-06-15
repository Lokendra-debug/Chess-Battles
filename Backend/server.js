const express = require("express");
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path')
const cookieParser = require('cookie-parser');



const { connection } = require("./database/db");
const {redis} = require("./database/redis");
const {userRoute}=require("./routes/user.route")

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));


app.use("/user",userRoute)


app.get('/friendchess',function(req,res){
    // res.redirect('/public/chess-ai-main/index.html')
    res.sendFile(__dirname + '/public/default.html');
})


app.all("*",(req,res)=>{
    res.status(404).send({
        "error": `404 ! Invalid URL Detected.`
    })
})



const server = http.createServer(app);

server.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.port}`);
})

// socket app
const io = new Server(server);
io.on('connection', function (socket) {
    console.log('new connection');

    socket.on('message', function (msg) {
        console.log('Got message from client: ' + msg);
    });
});

io.on('connection', function (socket) {
    console.log('new connection');

    // Called when the client calls socket.emit('move')
    socket.on('move', function (msg) {
        socket.broadcast.emit('move', msg);
    });
});