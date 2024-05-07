import React, { useRef } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
   image: string;
   x: number;
   y: number;
}

const pieces: Piece[] = [];

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
   const chessboardRef = useRef(null);

   let board = [];

   let activePiece: HTMLElement | null = null;

   function grabPiece(e: React.MouseEvent) {
      const element = e.target as HTMLElement;
      if (element.classList.contains('chess-piece')) {
         const x = e.clientX - 45;
         const y = e.clientY - 45;
         element.style.position = 'absolute';
         element.style.left = `${x}px`;
         element.style.top = `${y}px`;

         activePiece = element;
      }
   }

   function movePiece(e: React.MouseEvent) {
      if (activePiece) {
         const x = e.clientX - 45;
         const y = e.clientY - 45;
         activePiece.style.position = 'absolute';
         activePiece.style.left = `${x}px`;
         activePiece.style.top = `${y}px`;
      }


   }
   for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {
         const number = j + i + 2;
         let image = '';

         pieces.forEach(piece => {
            if (piece.x === i && piece.y === j) {
               image = piece.image;
            }
         });

         board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
         // Add the key prop to the Tile component, the key prop is a unique identifier for each Tile component
      }
   }

   return (
      <div
         onMouseMove={(e) => movePiece(e)}
         onMouseDown={e => grabPiece(e)}
         onMouseUp={e => activePiece = null}
         id="chessboard"
         ref={chessboardRef}
      >
         {board}
      </div>
   );

}