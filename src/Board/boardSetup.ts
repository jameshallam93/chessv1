import { initialPositions } from "../data/INITIAL_PIECE_POSITIONS"
import { Pieces } from "../Pieces"
import { Piece } from "../Pieces/_Piece"

type Board = (Piece | null)[][]


const getEmptyBoard = (): Board => {
    let emptyBoard = []
    for (let i = 1; i < 9; i++) {
        let boardRow = []
        for (let j = 1; j < 9; j++) {
            boardRow.push(null)
        }
        emptyBoard.push(boardRow)

    }
    return emptyBoard
}
const coordsAreTheSame = (y: number, x: number, coords: number[][]) => {
    return coords.filter(coords =>
        coords[0] === y && coords[1] === x
    ).length !== 0
}

const getInitialBoardState = (): Board => {
    // remove this when all pieces are typescripted
    const boardState: any = getEmptyBoard()
    const pieceColor = (index: number) => index > 3 ? "White" : "Black"
    const piecePositionMap: any = {
        rook: {
            piece: Pieces.Rook,
            position: initialPositions.ROOK_SQUARES
        },
        bishop: {
            piece: Pieces.Bishop,
            position: initialPositions.BISHOP_SQUARES
        },
        knight: {
            piece: Pieces.Knight,
            position: initialPositions.KNIGHT_SQUARES
        },
        queen: {
            piece: Pieces.Queen,
            position: initialPositions.QUEEN_SQUARES
        },
        king: {
            piece: Pieces.King,
            position: initialPositions.KING_SQUARES
        }
    }

    boardState.forEach((row: (Piece | null)[], indexY: number) => {
        row.forEach((_square, indexX) => {

            if (initialPositions.PAWN_ROWS.includes(indexY)) {
                boardState[indexY][indexX] = new Pieces.Pawn(indexY, indexX, pieceColor(indexY))
            }

            Object.values(piecePositionMap).forEach((mapping: any) => {
                if (coordsAreTheSame(indexY, indexX, mapping.position)) {
                    boardState[indexY][indexX] = new mapping.piece(indexY, indexX, pieceColor(indexY))
                }
            })
            if (!boardState[indexY][indexX]) {
                boardState[indexY][indexX] = null
            }
            // if (coordsAreTheSame(indexY, indexX, initialPositions.ROOK_SQUARES)) {

            // }
            // else if (coordsAreTheSame(indexY, indexX, initialPositions.KING_SQUARES)) {
            //     boardState[indexY][indexX] = new Pieces.King(indexY, indexX, pieceColor(indexY))
            // }
            // else if (coordsAreTheSame(indexY, indexX, initialPositions.QUEEN_SQUARES)) {
            //     boardState[indexY][indexX] = new Pieces.Queen(indexY, indexX, pieceColor(indexY))
            // }
            // else if (coordsAreTheSame(indexY, indexX, initialPositions.BISHOP_SQUARES)) {
            //     boardState[indexY][indexX] = new Pieces.Bishop(indexY, indexX, pieceColor(indexY))
            // }
            // else if (coordsAreTheSame(indexY, indexX, initialPositions.KNIGHT_SQUARES)) {
            //     boardState[indexY][indexX] = new Pieces.Knight(indexY, indexX, pieceColor(indexY))
            // }


        })
    })
    return boardState
}


export const boardSetup = {
    getInitialBoardState
}