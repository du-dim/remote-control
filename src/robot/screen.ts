import { WebSocket, createWebSocketStream } from 'ws';
import robot from 'robotjs';
import Jimp from 'jimp';

export const screen = async (ws: WebSocket) => {
  const x = robot.getMousePos().x;
  const y = robot.getMousePos().y;
  const size = 200;
  const bitmap = robot.screen.capture(x - size, y - size, size * 2, size * 2);
  const image = new Jimp({ data: bitmap.image, width: bitmap.width, height: bitmap.height });
  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  duplex.write(`prnt_scrn ${buffer.toString('base64')}`);
};
