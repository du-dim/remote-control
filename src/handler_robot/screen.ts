import robot from 'robotjs';
import Jimp from 'jimp';

export const screen = async () => {
  const x = robot.getMousePos().x;
  const y = robot.getMousePos().y;
  const size = 100;
  const bitmap = robot.screen.capture(x - size, y - size, size * 2, size * 2);
  swapRedAndBlueChannel(bitmap);
  const image = new Jimp({ data: bitmap.image, width: bitmap.width, height: bitmap.height });
  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
  const base64 = buffer.toString('base64');
  return base64;
};

const swapRedAndBlueChannel = (bmp: robot.Bitmap) => {
  for (let i = 0; i < bmp.width * bmp.height * 4; i += 4) {
    // swap red and blue channel
    [bmp.image[i], bmp.image[i + 2]] = [bmp.image[i + 2], bmp.image[i]]; // red channel
  }
};
