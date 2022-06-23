var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebSocketServer, createWebSocketStream } from 'ws';
import { mouse } from '../handler_robot/mouse.js';
import { draw } from '../handler_robot/draw.js';
import { screen } from '../handler_robot/screen.js';
const WSS_PORT = 8081;
const wsServer = new WebSocketServer({ port: WSS_PORT });
wsServer.on('connection', (ws) => {
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    ws.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const command = msg.toString().split(' ');
        switch (command[0]) {
            case 'mouse_position':
                duplex.write(mouse.position());
                break;
            case 'mouse_up':
                mouse.up(command[1]);
                duplex.write(command[0]);
                break;
            case 'mouse_down':
                mouse.down(command[1]);
                duplex.write(command[0]);
                break;
            case 'mouse_left':
                mouse.left(command[1]);
                duplex.write(command[0]);
                break;
            case 'mouse_right':
                mouse.right(command[1]);
                duplex.write(command[0]);
                break;
            case 'draw_circle':
                draw.circle(command[1]);
                duplex.write(command[0]);
                break;
            case 'draw_square':
                draw.square(command[1]);
                duplex.write(command[0]);
                break;
            case 'draw_rectangle':
                draw.rectangular(command[1], command[2]);
                duplex.write(command[0]);
                break;
            case 'prnt_scrn':
                duplex.write(`${command[0]} ${yield screen()}`);
                break;
            default:
                break;
        }
    }));
});
process.on('SIGINT', () => wsServer.close());
