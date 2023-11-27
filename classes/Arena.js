import { ARENA_WIDTH, ARENA_HEIGHT } from '../utils/constants.js';

const playerScore = document.getElementById('score');

export class Arena {
   constructor() {
      this.matrix = this.createMatrix(ARENA_WIDTH, ARENA_HEIGHT);
   }

   createMatrix(width, height) {
      return Array.from({ length: height }, () => new Array(width).fill(0));
   }

   reset() {
      this.matrix = this.createMatrix(ARENA_WIDTH, ARENA_HEIGHT);
   }

   sweep(player) {
      let sweptRows = 1;
      outer: for (let y = this.matrix.length - 1; y > 0; --y) {
         for (let x = 0; x < this.matrix[y].length; ++x) {
            if (this.matrix[y][x] === 0) {
               continue outer;
            }
         }

         const row = this.matrix.splice(y, 1)[0].fill(0);
         this.matrix.unshift(row);
         ++y;

         player.score += sweptRows * 10;
         sweptRows *= 2;

         playerScore.innerHTML = player.score;
      }
   }
}
