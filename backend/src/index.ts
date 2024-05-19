import {WebSocketServer} from "ws";
const wss =new WebSocketServer({port:8080});
let senderSocket = null;
let recieverSocket=null;
wss.on('connection',function connection(ws) {
    ws.on('message',function message(data:any){
        const message=JSON.parse(data);

        console.log(message)
    })
})