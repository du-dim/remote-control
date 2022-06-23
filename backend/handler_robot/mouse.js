import robot from 'robotjs';
export class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    posXY() {
        this.x = robot.getMousePos().x;
        this.y = robot.getMousePos().y;
    }
    position() {
        this.posXY();
        console.log(`mouse_position ${this.x},${this.y}`);
        return `mouse_position ${this.x},${this.y}`;
    }
    up(value) {
        this.posXY();
        const v = Number(value);
        this.y = this.y - v;
        robot.moveMouse(this.x, this.y);
    }
    down(value) {
        this.posXY();
        const v = Number(value);
        this.y = this.y + v;
        robot.moveMouse(this.x, this.y);
    }
    left(value) {
        this.posXY();
        const v = Number(value);
        this.x = this.x - v;
        robot.moveMouse(this.x, this.y);
    }
    right(value) {
        this.posXY();
        const v = Number(value);
        this.x = this.x + v;
        robot.moveMouse(this.x, this.y);
    }
}
export const mouse = new Mouse();
