import robot from 'robotjs';
import { Mouse } from './mouse.js';

class Draw extends Mouse {
  time: number;
  constructor() {
    super();
    this.time = 1;
  }

  async move() {
    const promis = new Promise((res) => {
      robot.mouseToggle('down');
      setTimeout(() => {
        robot.moveMouse(this.x, this.y);
        robot.mouseToggle('up');
        res(true);
      }, this.time);
    });
    await promis;
  }

  async circle(radius: string) {
    this.posXY();
    const r = Number(radius);
    const a = (Math.acos(1 / r) * Math.PI) / 180;
    const cx = this.x;
    const cy = this.y + r;

    for (let i = 0; i <= 2 * Math.PI; i += a) {
      this.x = cx + r * Math.sin(i);
      this.y = cy - r * Math.cos(i);
      await this.move();
    }
  }

  async square(size: string) {
    this.posXY();
    const s = Number(size);
    const step = s / 50;
    for (let i = 0; i <= s; i += step) {
      this.x = this.x + step;
      await this.move();
    }
    for (let i = 0; i <= s; i += step) {
      this.y = this.y + step;
      await this.move();
    }
    for (let i = 0; i <= s; i += step) {
      this.x = this.x - step;
      await this.move();
    }
    for (let i = 0; i <= s; i += step) {
      this.y = this.y - step;
      await this.move();
    }
  }

  async rectangular(width: string, height: string) {
    this.posXY();
    const w = Number(width);
    const h = Number(height);
    const stepW = w / 50;
    const stepH = h / 50;
    for (let i = 0; i <= w; i += stepW) {
      this.x = this.x + stepW;
      await this.move();
    }
    for (let i = 0; i <= h; i += stepH) {
      this.y = this.y + stepH;
      await this.move();
    }
    for (let i = 0; i <= w; i += stepW) {
      this.x = this.x - stepW;
      await this.move();
    }
    for (let i = 0; i <= h; i += stepH) {
      this.y = this.y - stepH;
      await this.move();
    }
  }
}

export const draw = new Draw();
