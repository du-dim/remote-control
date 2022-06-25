import { WebSocketServer, createWebSocketStream } from 'ws';
import { mouse } from '../handler_robot/mouse.js';
import { draw } from '../handler_robot/draw.js';
import { screen } from '../handler_robot/screen.js';

const WSS_PORT = process.env.WSS_PORT || 8181;
const wsServer = new WebSocketServer({ port: +WSS_PORT });

wsServer.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  ws.on('message', async (msg) => {
    console.log(`\x1b[36mReceived: \x1b[0m${msg}`);
    const command = msg.toString().split(' ');
    switch (command[0]) {
      case 'mouse_position':
        duplex.write(`${mouse.position()}`);
        console.log(`\x1b[32mResult:\x1b[0m ${mouse.position()} completed successfully\n`);
        break;
      case 'mouse_up':
        mouse.up(command[1]);
        duplex.write(command[0]);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'mouse_down':
        mouse.down(command[1]);
        duplex.write(command[0]);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'mouse_left':
        mouse.left(command[1]);
        duplex.write(command[0]);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'mouse_right':
        mouse.right(command[1]);
        duplex.write(command[0]);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'draw_circle':
        draw.circle(command[1]);
        duplex.write(command[0] + '\0');
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'draw_square':
        draw.square(command[1]);
        duplex.write(command[0]);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'draw_rectangle':
        draw.rectangular(command[1], command[2]);
        duplex.write(command[0]);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      case 'prnt_scrn':
        duplex.write(`${command[0]} ${await screen()}`);
        console.log(`\x1b[32mResult:\x1b[0m ${command[0]} completed successfully\n`);
        break;
      default:
        break;
    }
  });
});

process.on('SIGINT', () => wsServer.close());
