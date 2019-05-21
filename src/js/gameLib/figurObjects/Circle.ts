import GameObject from '../GameObject'

class Circle extends GameObject {
  constructor(context: CanvasRenderingContext2D,
              posX:number = 0,
              posY:number = 0,
              radius:number = 10,
              color: string = "#0095DD") {
    super(context, posX, posY)
    this._width = radius*2;
    this._color = color;
  }

  
  private _color:string;
  get color() { return this._color }
  set color(color:string) { this._color = color }

  get radius() { return this._width }
  set radius(radius:number) { this._width = radius*2 }

  drow = () => {
    this.context.beginPath();
    this.context.arc(this.posX, this.posY, this._width/2, 0, Math.PI*2);
    this.context.fillStyle = this._color;
    this.context.fill();
    this.context.closePath();
  }

  update = () => {};
}

export default Circle;
