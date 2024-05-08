import { PieceType, Team } from "../components/Chessboard/Chessboard";

export default class Referee {
   isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: Team) {
      console.log("Checking if the move is valid")
      console.log("Previous position: " + px + ", " + py)
      console.log("New position: " + x + ", " + y)
      console.log("Piece type: " + type)
      console.log("Team: " + team)

      if (type === PieceType.PAWN) {
         if (team === Team.PLAYER) {
            if (px === x && py === y - 1) {
               return true;
            }
         }

         return true;
      }
      return false;
   }
}