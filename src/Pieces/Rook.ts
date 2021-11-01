import { Piece } from "./_Piece"
import { DIRECTIONS } from "../data/DIRECTIONS"
import { BoardState } from "../models"

class Rook extends Piece {
    _sprite: string
    points: number

    constructor(y: number, x: number, color: string) {
        super(y, x, color)
        this.type = "Rook"
        this._sprite = `${this.color.charAt(0)}${this.type}`
        this.points = 5
    }
    get sprite() {
        return this._sprite
    }
    set sprite(newSprite) {
        this._sprite = newSprite
    }
    getLegalMoves(board: BoardState) {
        const legalMoves = []
        const y = this._y
        const x = this._x
        let blocked = false
        const squaresLeft = this._forward < 0 ? y + 1 : 7 - y + 1
        for (let i = 1; i < squaresLeft; i++) {
            console.log("blocked? ", blocked)
            const vector = i * this._forward
            if (board[y + (vector)][x] !== null) {
                blocked = true
                if (this.captureIsPossible(board, i, DIRECTIONS.Forwards)) {
                    legalMoves.push([y + (vector), x])
                }
            }

            if (!blocked && this.moveIsPossible(board, i, DIRECTIONS.Forwards)) {
                legalMoves.push([y + (vector), x])
            }
        }
        console.log("legal moves: ", legalMoves)
        for (let i = 0; i < 8; i++) {
            legalMoves.push([y + i, x])
        }
        for (let i = 0; i < 8; i++) {
            legalMoves.push([y, x + i])
        }
        for (let i = 0; i < 8; i++) {
            legalMoves.push([y, x - i])
        }

        return legalMoves
    }
}
export { Rook }