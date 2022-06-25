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
      setTimeout(() => {
        robot.moveMouse(this.x, this.y);
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
    robot.mouseToggle('down');
    for (let i = 0; i <= 2 * Math.PI + a; i += a) {
      this.x = cx + r * Math.sin(i);
      this.y = cy - r * Math.cos(i);
      await this.move();
    }
    robot.mouseToggle('up');
  }

  async square(size: string) {
    this.posXY();
    const s = Number(size);
    const step = s / 50;
    robot.mouseToggle('down');
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
    robot.mouseToggle('up');
  }

  async rectangular(width: string, height: string) {
    this.posXY();
    const w = Number(width);
    const h = Number(height);
    const step = (w + h) / 100;
    robot.mouseToggle('down');
    for (let i = 0; i <= w; i += step) {
      this.x = this.x + step;
      await this.move();
    }
    for (let i = 0; i <= h; i += step) {
      this.y = this.y + step;
      await this.move();
    }
    for (let i = 0; i <= w; i += step) {
      this.x = this.x - step;
      await this.move();
    }
    for (let i = 0; i <= h; i += step) {
      this.y = this.y - step;
      await this.move();
    }
    robot.mouseToggle('up');
  }
}

export const draw = new Draw();
