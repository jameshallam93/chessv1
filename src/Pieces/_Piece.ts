import { moveHelper } from "../moveHelper/moveHelper"


type BoardState = (Piece | null)[][]


class Piece {
    _y: number
    _x: number
    _color: string
    _coords: { y: number, x: number }
    status: string
    _selected: boolean
    _forward: number
    hasMoved: boolean
    type: string | undefined

    constructor(y: number, x: number, color: string) {
        this._coords = { y, x }
        this._y = y
        this._x = x
        this._color = color
        this.status = "alive"
        this._selected = false
        this._forward = this.color === "White" ? -1 : 1
        this.hasMoved = false
    }
    get coords() {
        return [this._y, this._x]
    }
    set coords(coords) {
        this._y = coords[0]
        this._x = coords[1]
        this.hasMoved = true
    }
    get color() {
        return this._color
    }
    // Overridden in child classes
    getLegalMoves(board: BoardState): number[][] {
        return [[]]
    }
    killPiece() {
        this.status = "dead"
        this._coords = {
            y: - 1, x: -1
        }
    }
    selectPiece() {
        this._selected = true
    }
    deselectPiece() {
        this._selected = false
    }
    get selected() {
        return this._selected
    }

    moveIsPossible(board: BoardState, distance: number, direction: number[]) {
        const vector = distance * this._forward

        const squaresTravelled = moveHelper.getSquaresTravelled(this.coords, vector, direction)
        console.log("squares travelled: ", squaresTravelled)
        const isBlocked = moveHelper.checkIfRouteBlocked(squaresTravelled)

        const newCoords = moveHelper.moveDistanceDirection(this.coords, vector, direction)
        const isOutOfBounds = moveHelper.checkIfOutOfBounds(this.coords, vector, direction)
        const squareContainsPiece = moveHelper.checkIfSquareContainsPiece(board, newCoords)
        console.log("Square contains piece?", squareContainsPiece)
        if (isOutOfBounds) {
            console.log("Out of bounds:", newCoords)
            return false
        }
        if (isBlocked && this.type !== "Knight") {
            console.log("square blocked: ", newCoords)
            return false
        }
        if (squareContainsPiece) {
            console.log("square contains piece: ", newCoords)
            return false
        }
        return true
    }

    captureIsPossible(board: BoardState, distance: number, direction: number[]) {
        if (board === null) {
            return false
        }
        const vector = distance * this._forward

        const squaresTravelled = moveHelper.getSquaresTravelled(this.coords, vector - (1 * this._forward), direction)
        const isBlocked = moveHelper.checkIfRouteBlocked(squaresTravelled)

        const newCoords = moveHelper.moveDistanceDirection(this.coords, vector, direction)
        const isOutOfBounds = moveHelper.checkIfOutOfBounds(this.coords, vector, direction)
        console.log("is out of bounds? ", isOutOfBounds)
        const squareContainsPiece = moveHelper.checkIfSquareContainsPiece(board, newCoords)
        if (squareContainsPiece && board[newCoords[0]][newCoords[1]]?._color === this._color) {
            return false
        }
        if (isOutOfBounds) {
            return false
        }
        if (isBlocked) {
            return false
        }
        if (!squareContainsPiece) {
            return false
        }
        return true
    }
}
export { Piece }