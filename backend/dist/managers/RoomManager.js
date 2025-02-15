"use strict";
// import { User } from "./UserManager"
// interface Room {
//     user1: User,
//     user2: User
// }
// let GLOBAL_ROOM_ID = 1;
// export class RoomManager {
//     private rooms: Map<String, Room>;
//     constructor() {
//         this.rooms = new Map<String, Room>;
//     }
// //have to be defined
//     //     UserLeft(roomId:string){
// // const room=this.rooms.find
// //     }
//     createRoom(user1: User, user2: User) {
//         const roomId = this.generate();
//         this.rooms.set(roomId.toString(), {
//             user1, user2
//         })
//         user1.socket.emit("new-room", {
//             type: "send-offer",
//             roomId
//         })
//     }
//     onOffer(roomId: string, sdp: string) {
//         const user2 = this.rooms.get(roomId)?.user2;
//         user2?.socket.emit("offer", {
//             sdp
//         })
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
let GLOBAL_ROOM_ID = 1;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        const roomId = this.generate().toString();
        this.rooms.set(roomId.toString(), {
            user1,
            user2,
        });
        user1.socket.emit("send-offer", {
            roomId
        });
        user2.socket.emit("send-offer", {
            roomId
        });
    }
    onOffer(roomId, sdp, senderSocketid) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser === null || receivingUser === void 0 ? void 0 : receivingUser.socket.emit("offer", {
            sdp,
            roomId
        });
    }
    onAnswer(roomId, sdp, senderSocketid) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser === null || receivingUser === void 0 ? void 0 : receivingUser.socket.emit("answer", {
            sdp,
            roomId
        });
    }
    onIceCandidates(roomId, senderSocketid, candidate, type) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser.socket.emit("add-ice-candidate", ({ candidate, type }));
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
}
exports.RoomManager = RoomManager;
