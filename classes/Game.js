import { TICK_RATE, BLOCK_SIZE, COLORS } from '../utils/constants.js';

const canvas = document.getElementById('tetris');
const overlay = document.getElementById('overlay');
const context = canvas.getContext('2d');
const playerScore = document.getElementById('score');

context.scale(BLOCK_SIZE, BLOCK_SIZE);

export class Game {
   constructor(arena, player) {
      this.arena = arena;
      this.player = player;

      this.lastTime = 0;
      this.dropCounter = 0;
      this.dropInterval = TICK_RATE;
   }

   renderMatrix(matrix, offset) {
      matrix.forEach((row, y) => {
         row.forEach((value, x) => {
            if (value !== 0) {
               context.fillStyle = COLORS[value];
               context.fillRect(x + offset.x, y + offset.y, 1, 1);

               context.strokeStyle = 'black';
               context.lineWidth = 0.1;
               context.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
         });
      });
   }

   render() {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      this.renderMatrix(this.arena.matrix, { x: 0, y: 0 });
      this.renderMatrix(this.player.matrix, this.player.position);
   }

   tick(time = 0) {
      if (!this.player.gameOver) {
         const deltaTime = time - this.lastTime;
         this.lastTime = time;

         this.dropCounter += deltaTime;
         if (this.dropCounter > this.dropInterval) {
            this.dropCounter = 0;
            this.player.drop();
         }

         this.render();

         requestAnimationFrame((time) => this.tick(time));
      } else {
         overlay.classList.remove('hidden');
         this.arena.reset();
         this.render();
      }
   }

   start() {
      overlay.classList.add('hidden');

      this.player.gameOver = false;
      this.player.resetScore();
      this.player.createPiece();
      this.arena.reset();
      playerScore.innerHTML = '0';

      this.tick(0);
   }
}
