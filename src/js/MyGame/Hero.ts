import GameObject from "../gameLib/GameObject";



class Hero extends GameObject {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
    this._width = 10;
    this.setSpeed(2, 0);
  }

  drow() {
    this.context.beginPath();
    this.context.arc(this.posX, this.posY, this._width/2, 0, Math.PI*2);
    this.context.fillStyle = "red";
    this.context.fill();
    this.context.closePath();
    console.log()
  }

  update() {

  }

}

export default Hero
