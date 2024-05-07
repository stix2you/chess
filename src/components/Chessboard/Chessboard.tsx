import Tile from '../Tile/Tile';
import './Chessboard.css';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
   image: string;
   x: number;
   y: number;
}

const pieces: Piece [] = [];

for (let i = 0; i < 8; i++) {
   pieces.push({ image: "./assets/img/pawn_white.png", x: i, y: 1 });
   pieces.push({ image: "./assets/img/pawn_black.png", x: i, y: 6 });
}

pieces.push({ image: "./assets/img/rook_white.png", x: 0, y: 0 });
pieces.push({ image: "./assets/img/rook_white.png", x: 7, y: 0 });
pieces.push({ image: "./assets/img/rook_black.png", x: 0, y: 7 });
pieces.push({ image: "./assets/img/rook_black.png", x: 7, y: 7 });
pieces.push({ image: "./assets/img/knight_white.png", x: 1, y: 0 });
pieces.push({ image: "./assets/img/knight_white.png", x: 6, y: 0 });
pieces.push({ image: "./assets/img/knight_black.png", x: 1, y: 7 });
pieces.push({ image: "./assets/img/knight_black.png", x: 6, y: 7 });
pieces.push({ image: "./assets/img/bishop_white.png", x: 2, y: 0 });
pieces.push({ image: "./assets/img/bishop_white.png", x: 5, y: 0 });
pieces.push({ image: "./assets/img/bishop_black.png", x: 2, y: 7 });
pieces.push({ image: "./assets/img/bishop_black.png", x: 5, y: 7 });
pieces.push({ image: "./assets/img/queen_white.png", x: 3, y: 0 });
pieces.push({ image: "./assets/img/queen_black.png", x: 3, y: 7 });
pieces.push({ image: "./assets/img/king_white.png", x: 4, y: 0 });
pieces.push({ image: "./assets/img/king_black.png", x: 4, y: 7 });

export default function Chessboard() {
   let board = [];

   for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {
         const number = j + i + 2;
         let image = '';

         pieces.forEach(piece => {
            if (piece.x === i && piece.y === j) {
               image = piece.image;
            }
         });

       board.push(<Tile image={image} number={number} />);     
      }
   }

   return (
      <div id="chessboard">{board}</div>);

}