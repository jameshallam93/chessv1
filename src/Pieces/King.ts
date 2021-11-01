import { BoardState } from "../models"
import { Piece } from "./_Piece"

class King extends Piece {
    _sprite: string
    points: number
    constructor(y: number, x: number, color: string) {
        super(y, x, color)
        this.type = "King"
        this._sprite = `${this.color.charAt(0)}${this.type}`
        this.points = Infinity
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
        legalMoves.push(
            [y + 1, x],
            [y + 1, x + 1],
            [y + 1, x - 1],
            [y, x + 1],
            [y, x - 1],
            [y - 1, x],
            [y - 1, x + 1],
            [y - 1, x - 1]
        )
        return legalMoves
    }
}
export { King }