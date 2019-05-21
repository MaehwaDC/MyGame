import Game from './js/gameLib/MyGame'
import GameObject from './js/gameLib/GameObject';
import Circle from './js/gameLib/figurObjects/Circle';
import Hero from './js/MyGame/Hero';

const game: Game = new Game(".canvas", 60);

const circle: Circle = game.createCircle(100, 100, 15);
const circle2: Circle = game.createCircle();

const hero: Hero = new Hero(game.context);
game.addObject(hero);
circle.setSpeed(1, 1);
circle2.setSpeed(2, 2);
game.border = true;

game.update = () => {
  circle.movement();
  circle2.movement();
}

game.init();
