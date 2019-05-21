
abstract class GameObject {
  constructor(context: CanvasRenderingContext2D, psoX: number = 0, posY: number = 0) {
    this.posX = psoX;
    this.posY = posY;
    this.context = context;
  }

  protected posX: number;
  get positionX() { return this.posX }
  set positionX(x: number) { this.posX = x; }

  protected posY: number;
  get positionY() { return this.posY; }
  set positionY(y: number) { this.posX = y; }

  protected _dX: number = 0;
  set speedX(dx: number) { this._dX = dx; }

  protected _dY: number = 0;
  set speedY(dy: number) { this._dY = dy; }

  protected _width: number = 0;
  get width() { return this._width; }
  set width(width: number) { this._width = width; }

  protected context: CanvasRenderingContext2D

  movement = (): void => {
    
    this.posX += this._dX;
    this.posY += this._dY;
  }

  setSpeed = (dx:number, dy: number): void => {
    this._dX = dx;
    this._dY = dy;
  }

  abstract drow(): void;
  abstract update(): void;
}

export default GameObject;
