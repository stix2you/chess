import React, { useEffect, useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
   image: string;
   x: number;
   y: number;
}

const initialBoardState: Piece[] = [];

// Initialize the pieces state with the initial positions of all chess pieces
initialBoardState.push({ image: "./assets/img/rook_white.png", x: 0, y: 0 });
initialBoardState.push({ image: "./assets/img/rook_white.png", x: 7, y: 0 });
initialBoardState.push({ image: "./assets/img/rook_black.png", x: 0, y: 7 });
initialBoardState.push({ image: "./assets/img/rook_black.png", x: 7, y: 7 });
initialBoardState.push({ image: "./assets/img/knight_white.png", x: 1, y: 0 });
initialBoardState.push({ image: "./assets/img/knight_white.png", x: 6, y: 0 });
initialBoardState.push({ image: "./assets/img/knight_black.png", x: 1, y: 7 });
initialBoardState.push({ image: "./assets/img/knight_black.png", x: 6, y: 7 });
initialBoardState.push({ image: "./assets/img/bishop_white.png", x: 2, y: 0 });
initialBoardState.push({ image: "./assets/img/bishop_white.png", x: 5, y: 0 });
initialBoardState.push({ image: "./assets/img/bishop_black.png", x: 2, y: 7 });
initialBoardState.push({ image: "./assets/img/bishop_black.png", x: 5, y: 7 });
initialBoardState.push({ image: "./assets/img/queen_white.png", x: 3, y: 0 });
initialBoardState.push({ image: "./assets/img/queen_black.png", x: 3, y: 7 });
initialBoardState.push({ image: "./assets/img/king_white.png", x: 4, y: 0 });
initialBoardState.push({ image: "./assets/img/king_black.png", x: 4, y: 7 });
for (let i = 0; i < 8; i++) {
   initialBoardState.push({ image: "./assets/img/pawn_white.png", x: i, y: 1 });
   initialBoardState.push({ image: "./assets/img/pawn_black.png", x: i, y: 6 });
}

export default function Chessboard() {
   const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);  // Initialize the activePiece state with null
   const [gridX, setGridX] = useState<number>(0);
   const [gridY, setGridY] = useState<number>(0);
   const [pieces, setPieces] = useState<Piece[]>(initialBoardState);  // Initialize the pieces state with an empty array
   const chessboardRef = useRef<HTMLDivElement>(null);  // Create a reference to the chessboard div element
   let board = [];  // The board array will contain the Tile components

   // Grab the piece that is being clicked
   function grabPiece(e: React.MouseEvent) {
      const element = e.target as HTMLElement;
      const chessboard = chessboardRef.current;  // Get the chessboard element
      if (element.classList.contains('chess-piece') && chessboard) {

         // Calculate the raw x and y coordinates based on the mouse event relative to the chessboard
         const rawX = (e.clientX - chessboard.offsetLeft) / 90;
         const rawY = (720 - e.clientY - chessboard.offsetTop) / 90; // subtract the y-coordinate from 720 to invert the y-axis
         // Round x and y down to get the nearest lower integer
         const flooredX = Math.floor(rawX);
         const flooredY = Math.floor(rawY);
         // Ensure x and y coordinates are within the 0 to 7 range, and do not exceed the chessboard boundaries
         const gridX = Math.max(0, Math.min(7, flooredX));
         const gridY = Math.max(0, Math.min(7, flooredY));

         setGridX(gridX);  // Update the gridX state with the x-coordinate of the piece (sets the global state of the x-coordinate)
         setGridY(gridY);  // Update the gridY state with the y-coordinate of the piece (sets the global state of the y-coordinate)
         
         console.log("on grab:", gridX, gridY);

         const x = e.clientX - 45;
         const y = e.clientY - 45;
         
         element.style.position = 'absolute';
         element.style.left = `${x}px`;
         element.style.top = `${y}px`;
         
         setActivePiece(element);  // Set the activePiece state to the clicked element
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
      const chessboard = chessboardRef.current;  // Get the chessboard element
      if (activePiece && chessboard) {   // Check if there is an active piece
         // Calculate the raw x and y coordinates based on the mouse event relative to the chessboard
         const rawX = (e.clientX - chessboard.offsetLeft) / 90;
         const rawY = (720 - e.clientY - chessboard.offsetTop) / 90; // subtract the y-coordinate from 720 to invert the y-axis

         // Round x and y down to get the nearest lower integer
         const flooredX = Math.floor(rawX);
         const flooredY = Math.floor(rawY);

         // Ensure x and y coordinates are within the 0 to 7 range, and do not exceed the chessboard boundaries
         const x = Math.max(0, Math.min(7, flooredX));
         const y = Math.max(0, Math.min(7, flooredY));

         console.log("on drop:", x, y);

         setPieces((value) => {     // Update the pieces state with the new position of the piece
            const pieces = value.map(p => {    // Loop through the pieces array
               if (p.x === gridX && p.y === gridY) {  // Check if the piece is on the current tile
                  p.x = x;
                  p.y = y;
               }
               return p;              // Return the piece as it is
            })
            return pieces;  // Return the updated pieces array
         });
         
         setActivePiece(null);  // Reset the activePiece state to null
      }
   }

   // Create the chessboard
   for (let j = verticalAxis.length - 1; j >= 0; j--) {  // Loop through the vertical axis in reverse order
      for (let i = 0; i < horizontalAxis.length; i++) {  // Loop through the horizontal axis for each vertical tile
         const number = j + i + 2;                       // Calculate the number of the tiles
         let image = '';                                 // Initialize the image variable to an empty string

         pieces.forEach(piece => {                    // Loop through the pieces array       
            if (piece.x === i && piece.y === j) {     // Check if the piece is on the current tile
               image = piece.image;                   // Set the image variable to the image of the piece
            }
         });

         board.push(<Tile key={`${j},${i}`} image={image} number={number} />);  // Add the Tile component to the board array
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