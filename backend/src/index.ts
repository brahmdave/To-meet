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

// import { Usermanger } from "./managers/UserManager";

// //socket io implementation
// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// import { Server, Socket } from "socket.io";
// const io = new Server(server,{
//   cors :{
//     origin:"*"
//   }
// });
// const UserManager=new Usermanger();

// io.on('connection', (socket:Socket) => {
//   console.log('a user connected');
//   UserManager.addUser("bd",socket);
//   socket.on("disconnect",()=>{
//     UserManager.removeUser(socket.id);
//   })
// });
// server.listen(3000,()=>{
//     console.log("server running on port 3000")
// })

import { Socket } from "socket.io";
import http from "http";

import express from 'express';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManager";

const app = express();
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});