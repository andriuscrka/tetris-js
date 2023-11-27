import { Player } from './classes/Player.js';
import { Arena } from './classes/Arena.js';
import { Game } from './classes/Game.js';

import {
   ARROW_UP,
   ARROW_DOWN,
   ARROW_LEFT,
   ARROW_RIGHT,
} from './utils/constants.js';

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => game.start());

const arena = new Arena();
const player = new Player(arena);
const game = new Game(arena, player);

document.addEventListener('keydown', (event) => {
   if (event.keyCode === ARROW_LEFT) {
      player.move(-1);
   } else if (event.keyCode === ARROW_RIGHT) {
      player.move(1);
   } else if (event.keyCode === ARROW_DOWN) {
      player.drop();
      game.dropCounter = 0;
   } else if (event.keyCode === ARROW_UP) {
      player.playerRotate();
   }
});
