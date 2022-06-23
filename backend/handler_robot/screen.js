var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import robot from 'robotjs';
import Jimp from 'jimp';
export const screen = () => __awaiter(void 0, void 0, void 0, function* () {
    const x = robot.getMousePos().x;
    const y = robot.getMousePos().y;
    const size = 100;
    const bitmap = robot.screen.capture(x - size, y - size, size * 2, size * 2);
    const image = new Jimp({ data: bitmap.image, width: bitmap.width, height: bitmap.height });
    const buffer = yield image.getBufferAsync(Jimp.MIME_PNG);
    const base64 = buffer.toString('base64');
    return base64;
});
