import { BoardState, Coords } from "../models"
import { Piece } from "../Pieces/_Piece"

const whiteOrBlackSquare = (x: number, y: number) => {
    if ((x + y) % 2 === 0) {
        return "white"
    }
    return "black"
}

export const getSquareClassName = (piece: Piece | null, indexY: number, indexX: number) => {
    const squareColor = whiteOrBlackSquare(indexX, indexY)
    const pieceColor = piece === null ? "" : piece.color
    const selected = piece === null ? "" : piece.selected

    let className = `square-button ${squareColor} `

    if (piece !== null) {
        className += `${pieceColor}`

        if (selected) {
            className += " selected "
        }
    }
    return className
}

export const copyBoard = (board: BoardState): BoardState => {
    return board.map(x => x)
}

export const handlePieceTakesPiece = (attackingPiece: Piece | null, attackedPiece: Piece | null, board: BoardState) => {
    const newBoard = copyBoard(board)
    if (!attackingPiece || !attackedPiece) {
        return newBoard
    }
    const attackingCoords = attackingPiece.coords
    const [oldY, oldX] = attackingCoords
    const attackedCoords = attackedPiece.coords
    const [newY, newX] = attackedCoords

    attackedPiece.killPiece()

    attackingPiece.coords = attackedCoords
    attackingPiece.deselectPiece()

    newBoard[newY][newX] = attackingPiece
    newBoard[oldY][oldX] = null

    return newBoard
}
export const handleMoveToEmptySquare = (newCoords: Coords, piece: Piece | null, board: BoardState) => {

    const newBoard = copyBoard(board)
    if (!piece) {
        return newBoard
    }


    const oldCoords = piece.coords
    const [oldY, oldX] = oldCoords
    const [newY, newX] = newCoords

    piece.coords = newCoords
    piece.deselectPiece()

    newBoard[newY][newX] = piece
    newBoard[oldY][oldX] = null

    return newBoard
}
export const movesetContainsMove = (moveset: Coords[], move: Coords) => {
    const y = move[0]
    const x = move[1]
    let isContained = false
    moveset.forEach(set => {
        if (y === set[0] && x === set[1]) {
            isContained = true
        }
    })
    return isContained
}

const boardTools = {
    getSquareClassName,
    copyBoard,
    handlePieceTakesPiece,
    handleMoveToEmptySquare,
    movesetContainsMove
}
export { boardTools }