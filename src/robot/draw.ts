import robot from 'robotjs';

class Draw {
  x: number;
  y: number;
  time: number;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.time = 0;
  }
  posXY() {
    this.x = robot.getMousePos().x;
    this.y = robot.getMousePos().y;
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
    for (let i = 0; i <= s; i++) {
      this.x = this.x + 1;
      await this.move();
    }
    for (let i = 0; i <= s; i++) {
      this.y = this.y + 1;
      await this.move();
    }
    for (let i = 0; i <= s; i++) {
      this.x = this.x - 1;
      await this.move();
    }
    for (let i = 0; i <= s; i++) {
      this.y = this.y - 1;
      await this.move();
    }
  }

  async rectangular(width: string, height: string) {
    this.posXY();
    const w = Number(width);
    const h = Number(height);
    for (let i = 0; i <= w; i++) {
      this.x = this.x + 1;
      await this.move();
    }
    for (let i = 0; i <= h; i++) {
      this.y = this.y + 1;
      await this.move();
    }
    for (let i = 0; i <= w; i++) {
      this.x = this.x - 1;
      await this.move();
    }
    for (let i = 0; i <= h; i++) {
      this.y = this.y - 1;
      await this.move();
    }
  }
}

export const draw = new Draw();
