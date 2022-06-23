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
import { Mouse } from './mouse.js';
class Draw extends Mouse {
    constructor() {
        super();
        this.time = 1;
    }
    move() {
        return __awaiter(this, void 0, void 0, function* () {
            const promis = new Promise((res) => {
                robot.mouseToggle('down');
                setTimeout(() => {
                    robot.moveMouse(this.x, this.y);
                    robot.mouseToggle('up');
                    res(true);
                }, this.time);
            });
            yield promis;
        });
    }
    circle(radius) {
        return __awaiter(this, void 0, void 0, function* () {
            this.posXY();
            const r = Number(radius);
            const a = (Math.acos(1 / r) * Math.PI) / 180;
            const cx = this.x;
            const cy = this.y + r;
            for (let i = 0; i <= 2 * Math.PI; i += a) {
                this.x = cx + r * Math.sin(i);
                this.y = cy - r * Math.cos(i);
                yield this.move();
            }
        });
    }
    square(size) {
        return __awaiter(this, void 0, void 0, function* () {
            this.posXY();
            const s = Number(size);
            const step = s / 50;
            for (let i = 0; i <= s; i += step) {
                this.x = this.x + step;
                yield this.move();
            }
            for (let i = 0; i <= s; i += step) {
                this.y = this.y + step;
                yield this.move();
            }
            for (let i = 0; i <= s; i += step) {
                this.x = this.x - step;
                yield this.move();
            }
            for (let i = 0; i <= s; i += step) {
                this.y = this.y - step;
                yield this.move();
            }
        });
    }
    rectangular(width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            this.posXY();
            const w = Number(width);
            const h = Number(height);
            const stepW = w / 50;
            const stepH = h / 50;
            for (let i = 0; i <= w; i += stepW) {
                this.x = this.x + stepW;
                yield this.move();
            }
            for (let i = 0; i <= h; i += stepH) {
                this.y = this.y + stepH;
                yield this.move();
            }
            for (let i = 0; i <= w; i += stepW) {
                this.x = this.x - stepW;
                yield this.move();
            }
            for (let i = 0; i <= h; i += stepH) {
                this.y = this.y - stepH;
                yield this.move();
            }
        });
    }
}
export const draw = new Draw();
