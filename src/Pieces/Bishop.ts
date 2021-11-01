import { BoardState } from "../models"
import { Piece } from "./_Piece"

class Bishop extends Piece {
    points: number
    _sprite: string
    constructor(y: number, x: number, color: string) {
        super(y, x, color)
        this.type = "Bishop"
        this._sprite = `${this.color.charAt(0)}${this.type}`
        this.points = 3
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
        return legalMoves
    }
}
export { Bishop }