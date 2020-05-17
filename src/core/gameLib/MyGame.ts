import GameObject from './GameObject';
import Circle from './figurObjects/Circle';
import { asyncDelay } from '../utils/time';

class Game {
  constructor(
    canvasSelector: string,
    private readonly fps: number = 30
  ) {
    this.canvas = document.querySelector(canvasSelector);
    this.context = this.canvas.getContext('2d');
  };

  //контекст и сам канвас
  readonly context: CanvasRenderingContext2D;
  readonly canvas: HTMLCanvasElement;

  //флаг для границы канваса
  hasBorder: boolean = false;

  //список объектов можно только получить
  private objects: GameObject[] = [];

  get objectsList() {
    return this.objects;
  }

  //реализация множественого использования апдейта
  update: Function[] = [];

  //создание круга
  createCircle = (posX: number = 0,
                  posY: number = 0,
                  radius: number = 10,
                  color: string = '#0095DD'): Circle => {
    const circle = new Circle(this.context, posX + radius, posY + radius, radius, color);
    this.addObject(circle);
    return circle;
  };
  //добовление объекта в список
  addObject = (obj: GameObject): void => {
    this.objects.push(obj);
  };

  //цикл игры
  init = async () => {
    const gameLoop = () => {
      this._draw();
      this._funcUpdateObj();
      this.update.forEach(el => el());
    };

    while (true) {
      await asyncDelay(1000 / this.fps);
      gameLoop();
    }
  };

  //отресовка всех объектов списка
  private _draw = (): void => {
    this._drawPlayGround();
    this.objects.forEach(el => el.draw());
  };

  //обновление всех элементов списка
  private _funcUpdateObj = (): void => {
    this.objects.forEach(obj => {
      if (this.hasBorder) {
        if (obj.positionX > this.canvas.width - obj.width / 2 || obj.positionX < 0 + obj.width / 2) obj.speedX = -obj.speedX;
        if (obj.positionY > this.canvas.height - obj.width / 2 || obj.positionY < 0 + obj.width / 2) obj.speedY = -obj.speedY;
      }
      obj.update();
      obj.movement();
    });
  };

  //отрисовка канваса
  private _drawPlayGround = (): void => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
  };

}

export default Game;
