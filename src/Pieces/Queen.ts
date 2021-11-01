import { BoardState } from "../models"
import { Piece } from "./_Piece"

class Queen extends Piece {
    _sprite: string
    points: number

    constructor(y: number, x: number, color: string) {
        super(y, x, color)
        this.type = "Queen"
        this._sprite = `${this.color.charAt(0)}${this.type}`
        this.points = 9
    }
    get sprite() {
        return this._sprite
    }
    set sprite(newSprite) {
        this._sprite = newSprite
    }
    getLegalMoves(board: BoardState) {
        const legalMoves = []
        const x = this._x
        const y = this._y
        // diagonals
        for (let i = 1; i < 7; i++) {
            legalMoves.push([y + i, x + i])
        }
        for (let i = 1; i < 7; i++) {
            legalMoves.push([y - i, x + i])
        }
        for (let i = 1; i < 7; i++) {
            legalMoves.push([y + i, x - i])
        }
        for (let i = 1; i < 7; i++) {
            legalMoves.push([y - i, x - i])
        }
        // horizontal/vertical
        for (let i = 0; i < 7; i++) {
            legalMoves.push([y + i, x])
        }
        for (let i = 0; i < 7; i++) {
            legalMoves.push([y - i, x])
        }
        for (let i = 0; i < 7; i++) {
            legalMoves.push([y, x + i])
        }
        for (let i = 0; i < 7; i++) {
            legalMoves.push([y, x - i])
        }
        return legalMoves
    }
}
export { Queen }