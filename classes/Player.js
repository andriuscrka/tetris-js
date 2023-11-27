import { SHAPES } from '../utils/constants.js';

export class Player {
   constructor(arena) {
      this.score = 0;
      this.matrix = null;
      this.position = { x: 0, y: 0 };

      this.arena = arena;
      this.gameOver = false;
      this.score = 0;

      this.createPiece();
   }

   createPiece() {
      this.matrix = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.matrix = this.matrix.map((row) => [...row]);

      this.position = {
         x: 5,
         y: 0,
      };

      if (this.isColliding()) {
         this.gameOver = true;
         this.matrix = [];
      }
   }

   isColliding() {
      for (let y = 0; y < this.matrix.length; ++y) {
         for (let x = 0; x < this.matrix[y].length; ++x) {
            if (
               this.matrix[y][x] !== 0 &&
               //tikrina ar arenos eilutė egzistuoja
               (this.arena.matrix[y + this.position.y] &&
                  this.arena.matrix[y + this.position.y][
                     x + this.position.x
                  ]) !== 0
            ) {
               return true;
            }
         }
      }
      return false;
   }

   merge() {
      this.matrix.forEach((row, y) => {
         row.forEach((value, x) => {
            if (value !== 0) {
               this.arena.matrix[y + this.position.y][x + this.position.x] =
                  value;
            }
         });
      });

      this.createPiece();
      this.arena.sweep(this);
   }

   move(offset) {
      this.position.x += offset;

      if (this.isColliding()) {
         this.position.x -= offset;
      }
   }

   drop() {
      this.position.y++;

      if (this.isColliding()) {
         this.position.y--;
         this.merge();
         this.arena.sweep(this);
      }
   }

   rotate() {
      this.matrix.reverse();

      for (let y = 0; y < this.matrix.length; ++y) {
         for (let x = 0; x < y; ++x) {
            [this.matrix[x][y], this.matrix[y][x]] = [
               this.matrix[y][x],
               this.matrix[x][y],
            ];
         }
      }
   }

   resetScore() {
      this.score = 0;
   }

   playerRotate() {
      const pos = this.position.x;
      let offset = 1;
      this.rotate();
      while (this.isColliding()) {
         this.position.x += offset;
         offset = -(offset + (offset > 0 ? 1 : -1));
         if (offset > this.matrix[0].length) {
            this.rotate();
            this.rotate();
            this.rotate();
            this.position.x = pos;
            return;
         }
      }
   }
}
