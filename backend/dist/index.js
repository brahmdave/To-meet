"use strict";
//import {WebSocketServer} from "ws";
// const wss =new WebSocketServer({port:8080});
// let senderSocket = null;
// let recieverSocket=null;
// wss.on('connection',function connection(ws) {
//     ws.on('message',function message(data:any){
//         const message=JSON.parse(data);
// // types of messages
// // identify as a sender
// // identify as reciever
// //create offer
// //create answer
// // add ice candidate
// if(message.type=== "identify-as-sender"){
//     senderSocket=ws;
// }else if(message.type==="identify-as-reciever"){
//     recieverSocket=ws;
// }
// else if(message.type==="createOffer")
//         console.log(message)
//     })
// })
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const UserManager_1 = require("./managers/UserManager");
const app = (0, express_1.default)();
const server = http_1.default.createServer(http_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManager = new UserManager_1.UserManager();
io.on('connection', (socket) => {
    console.log('a user connected');
    userManager.addUser("randomName", socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        userManager.removeUser(socket.id);
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
