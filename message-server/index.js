const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

let users = [];
let chatRooms = [];
let messages = [];

io.on("connection", (socket) => {
    console.log("connected");

    socket.on("connected", (user) => {
        let usr = {...user, id: socket.id}

        users.push(usr);
        console.log(users);

        io.emit("getUsers", users);
    });

    socket.on("disconnect", () => {
        console.log("disconnected ", socket.id);
        users = users.filter((usr) => {
            if(usr.id === socket.id){
                console.log(usr.id);
            }else {
                return usr;
            }
        })
    })

    socket.on("chatWith", (info) => {
        let available = chatRooms.filter((room) => {
            if(room === info.userName || room === info.other){
                return room;
            }
        });
        let roomName = "";
        console.log("available: ", available);

        if(available.length !== 0){
            roomName = info.other;
        }else{
            roomName = info.myself;
            chatRooms.push(roomName);
        }
        socket.join(roomName);

        console.log(roomName, chatRooms);
        io.to(roomName).emit("connectedToRoom", roomName);
    });

    socket.on("messageToServer", (messageInfo) => {
        io.to(messageInfo.roomName).emit("messageToClients", messageInfo);
    });
});

httpServer.listen(3000);