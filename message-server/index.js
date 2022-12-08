const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    secure: true,
    cors: {
        origin: "*",
    }
});

let users = [];
let chatRooms = [];

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
        console.log(users);

        io.emit("getUsers", users);
    })

    // clean up this code
    socket.on("chatWith", (info) => {
        let possibleRoomName = "";

        if(info.myself.localeCompare(info.other) > 0){
            possibleRoomName = info.other + "~" + info.myself;
        }else if(info.myself.localeCompare(info.other) < 0){
            possibleRoomName = info.myself + "~" + info.other;
        }

        let availableRoom = chatRooms.find((room) => {
            if(room === possibleRoomName){
                return room;
            }
        });

        let roomName = "";
        if(typeof availableRoom !== "undefined"){
            roomName = availableRoom;
        }else{
            roomName = possibleRoomName;
            chatRooms.push(roomName);
        }

        socket.join(roomName);
        io.to(roomName).emit("connectedToRoom", roomName);
    });

    socket.on("messageToServer", (messageInfo) => {
        io.to(messageInfo.roomName).emit("messageToClients", messageInfo);
    });

    socket.on("leaveRoom", () => {
        let rooms = socket.rooms;

        rooms.forEach((room) => {
            socket.leave(room);
        });
    })
});

httpServer.listen(3000);