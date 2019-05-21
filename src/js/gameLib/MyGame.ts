import GameObject from './GameObject'
import Circle from './figurObjects/Circle'

class Game {
  constructor(canvasSelector:string, fps:number = 30) {
    this._canvas = document.querySelector(canvasSelector);
    this._fps = fps;
    this._context = this._canvas.getContext("2d");
  };

  //контекст и сам канвас
  private _context: CanvasRenderingContext2D
  get context() { return this._context; }
  private _canvas: HTMLCanvasElement
  get canvas() { return this._canvas; }

  //храним кол-во кадров
  private _fps: number;

  //флаг для границы канваса
  private _hasBorder: boolean = false;
  set border(flag: boolean) { this._hasBorder = flag; }

  //список объектов можно только получить
  private _objects: GameObject[] = [];
  get objectsList() { return this._objects; }

  //реализация множественого использования апдейта
  private _update: Function[] = [];
  set update(func:Function) { this._update.push(func); }

  //создание круга
  createCircle = (posX:number = 0,
                  posY:number = 0,
                  radius:number = 10,
                  color:string = "#0095DD"): Circle => {
    const circle = new Circle(this._context, posX + radius, posY + radius, radius, color);
    this.addObject(circle);
    return circle;
  }
  //добовление объекта в список
  addObject = (obj: GameObject):void => { this._objects.push(obj) }

  //цикл игры
  init = () => {
    
    const gameLoop = () => {
      this._drow();
      this._funcUpdateObj();
      this._update.forEach(el => el());
    }
    setInterval(gameLoop, 1000/this._fps);
  }

  //отресовка всех объектов списка
  private _drow = (): void => {
    this._drowPlayGraund();
    this._objects.forEach(el => el.drow());
  }

  //обновление всех элементов списка
  private _funcUpdateObj = (): void => { 
    this._objects.forEach(obj => {
      if(this._hasBorder) {
        if(obj.positionX > this._canvas.width - obj.width/2 || obj.positionX < 0 + obj.width/2) obj.speedX = -obj.speedX;
        if(obj.positionY > this._canvas.height - obj.width/2 || obj.positionY < 0 + obj.width/2) obj.speedY = -obj.speedY;
      }
      obj.update(); 
      obj.movement();
    })  
  }

  //отрисовка канваса
  private _drowPlayGraund = (): void => {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._canvas.width = document.documentElement.clientWidth;
    this._canvas.height = document.documentElement.clientHeight;
  }
  
}

export default Game