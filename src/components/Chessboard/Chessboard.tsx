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
   const chessboardRef = useRef<HTMLDivElement>(null);  // Create a reference to the chessboard div element
   let board = [];  // The board array will contain the Tile components
   let activePiece: HTMLElement | null = null;  // The activePiece variable will store the piece that is being dragged

   // Grab the piece that is being clicked
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

   // Move the piece to the mouse position
   function movePiece(e: React.MouseEvent) {
      const chessboard = chessboardRef.current;
      if (activePiece && chessboard) {
         const minX = chessboard.offsetLeft - 40;
         const minY = chessboard.offsetTop - 40;
         const maxX = chessboard.offsetLeft + chessboard.clientWidth - 50;
         const maxY = chessboard.offsetTop + chessboard.clientHeight - 50;
         const x = e.clientX - 45;
         const y = e.clientY - 45;
         activePiece.style.position = 'absolute';

         // Check if the piece is within the chessboard, if not, set the position to the edge of the chessboard
         if (x < minX) {                           // If the piece is outside the chessboard on the left side
            activePiece.style.left = `${minX}px`;  // Set the left position to the left edge of the chessboard
         } else if (x > maxX) {                    // If the piece is outside the chessboard on the right side
            activePiece.style.left = `${maxX}px`;  // Set the left position to the right edge of the chessboard
         } else {
            activePiece.style.left = `${x}px`;     // Otherwise, set the left position to the current mouse position
         }
         if (y < minY) {                           // If the piece is outside the chessboard on the top side
            activePiece.style.top = `${minY}px`;   // Set the top position to the top edge of the chessboard
         } else if (y > maxY) {                    // If the piece is outside the chessboard on the bottom side         
            activePiece.style.top = `${maxY}px`;   // Set the top position to the bottom edge of the chessboard
         } else {
            activePiece.style.top = `${y}px`;      // Otherwise, set the top position to the current mouse position
         }
      }
   }

   function dropPiece(e: React.MouseEvent) {
      if (activePiece) {
         activePiece = null;
      }
   }

   // Create the chessboard
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
         onMouseUp={e => dropPiece(e)}
         id="chessboard"
         ref={chessboardRef}
      >
         {board}
      </div>
   );

}