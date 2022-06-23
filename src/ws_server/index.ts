import { WebSocketServer, createWebSocketStream } from 'ws';
import Jimp from 'jimp';
import { mouse } from '../robot/mouse.js';
import { draw } from '../robot/draw.js';
import { screen } from '../robot/screen.js';

const WSS_PORT = 4000;
const wsServer = new WebSocketServer({ port: WSS_PORT });
wsServer.on('connection', (ws) => {
  ws.on('message', async (msg) => {
    const command = msg.toString().split(' ');
    switch (command[0]) {
      case 'mouse_position':
        ws.send(mouse.position());
        break;
      case 'mouse_up':
        mouse.up(command[1]);
        ws.send(command[0]);
        break;
      case 'mouse_down':
        mouse.down(command[1]);
        ws.send(command[0]);
        break;
      case 'mouse_left':
        mouse.left(command[1]);
        ws.send(command[0]);
        break;
      case 'mouse_right':
        mouse.right(command[1]);
        ws.send(command[0]);
        break;
      case 'draw_circle':
        draw.circle(command[1]);
        ws.send(command[0]);
        break;
      case 'draw_square':
        draw.square(command[1]);
        ws.send(command[0]);
        break;
      case 'draw_rectangle':
        draw.rectangular(command[1], command[2]);
        ws.send(command[0]);
        break;
      case 'prnt_scrn':
        await screen(ws);
        // ws.send(command[0]);
        break;
      default:
        ws.send(' ');
        break;
    }
  });
});
