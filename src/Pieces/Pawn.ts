import { Piece } from "./_Piece"
import { moveHelper } from "../moveHelper/moveHelper"
import { DIRECTIONS } from "../data/DIRECTIONS"

type BoardState = (Piece | null)[][]


class Pawn extends Piece {
    _sprite: string
    points: number

    constructor(y: number, x: number, color: string) {
        super(y, x, color)
        this.type = "Pawn"
        this._sprite = `${this.color.charAt(0)}${this.type}`
        this.points = 1
    }
    get sprite() {
        return this._sprite
    }
    set sprite(newSprite) {
        this._sprite = newSprite
    }
    getLegalMoves(board: BoardState) {
        const legalMoves = []

        if (this.moveIsPossible(board, 1, DIRECTIONS.Forwards)) {
            const vector = 1 * this._forward
            const newCoords = moveHelper.moveDistanceDirection(this.coords, vector, DIRECTIONS.Forwards)
            console.log("The new x and y coordinates are ", newCoords)
            legalMoves.push(newCoords)
        }
        if (!this.hasMoved && this.moveIsPossible(board, 2, DIRECTIONS.Forwards)) {
            const vector = 2 * this._forward
            const newCoords = moveHelper.moveDistanceDirection(this.coords, vector, DIRECTIONS.Forwards)
            console.log("The new x and y coordinates are ", newCoords)
            legalMoves.push(newCoords)
        }
        if (this.captureIsPossible(board, 1, DIRECTIONS.DiagLeftForwards)) {
            const vector = 1 * this._forward
            const newCoords = moveHelper.moveDistanceDirection(this.coords, vector, DIRECTIONS.DiagLeftForwards)
            console.log("The new x and y coordinates are ", newCoords)

            legalMoves.push(newCoords)
        }
        if (this.captureIsPossible(board, 1, DIRECTIONS.DiagRightForwards)) {
            const vector = 1 * this._forward
            const newCoords = moveHelper.moveDistanceDirection(this.coords, vector, DIRECTIONS.DiagRightForwards)
            console.log("The new x and y coordinates are ", newCoords)

            legalMoves.push(newCoords)
        }
        console.log("the legal moves are ", legalMoves)
        return legalMoves
    }
}
export { Pawn }