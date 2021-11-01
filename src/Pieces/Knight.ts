import { Piece } from "./_Piece"
import { BoardState } from "../models"

class Knight extends Piece {
    _sprite: string
    points: number

    constructor(y: number, x: number, color: string) {
        super(y, x, color)
        this.type = "Knight"
        this._sprite = `${this.color.charAt(0)}${this.type}`
        this.points = 3
    }
    get sprite() {
        return this._sprite
    }
    getSprite() {
        const sprite = this.sprite
        return sprite
    }
    set sprite(newSprite) {
        this._sprite = newSprite
    }
    getLegalMoves(board: BoardState) {
        const legalMoves = []
        const y = this._y
        const x = this._x

        legalMoves.push(
            [y + 1, x + 2],
            [y + 1, x - 2],
            [y - 1, x + 2],
            [y - 1, x - 2],
            [y + 2, x + 1],
            [y - 2, x + 1],
            [y + 2, x - 1],
            [y - 2, x - 1]
        )
        return legalMoves
    }
}
export { Knight }