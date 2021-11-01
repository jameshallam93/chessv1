import React, { useState } from "react"
import { Piece } from "../Pieces/_Piece"
import { boardSetup } from "./boardSetup"
import { boardTools } from "./boardTools"
import { PieceImage } from "../PieceImage/PieceImage"

type BoardState = (Piece | null)[][]

const Board: React.FunctionComponent = () => {

    const boardState: BoardState = boardSetup.getInitialBoardState()
    const [board, setBoard] = useState<BoardState>(boardState)
    const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null)

    const refreshBoard = () => {
        const newBoard = boardTools.copyBoard(board)
        setBoard(newBoard)
    }

    const selectNewPiece = (newPiece: Piece | null) => {
        if (selectedPiece) {
            selectedPiece.deselectPiece()
        }
        if (newPiece) {
            newPiece.selectPiece()
            setSelectedPiece(newPiece)
        }
        refreshBoard()
    }

    const handlePieceMove = (newY: number, newX: number) => {
        let newBoard = boardTools.copyBoard(board)

        // if square is empty
        if (newBoard[newY][newX] === null) {
            newBoard = boardTools.handleMoveToEmptySquare([newY, newX], selectedPiece, newBoard)
            setSelectedPiece(null)
            return newBoard
        }
        // if moving to a non-empty square:
        const attackedPiece = newBoard[newY][newX]

        // if square is occupied by same color piece
        if (selectedPiece && attackedPiece && attackedPiece.color === selectedPiece.color) {
            selectNewPiece(attackedPiece)
            return newBoard
        }
        //if square is occupied by opposite color piece
        newBoard = boardTools.handlePieceTakesPiece(selectedPiece, attackedPiece, newBoard)
        setSelectedPiece(null)
        return newBoard
    }

    const handleClick = (piece: Piece | null, y: number, x: number) => {
        //--------------------------------------------------------------------------------------------------
        // param: piece => representation of square on a board, either containing nothing (null) or a piece
        //      : y / x => the y + x coordinate of the square that has just been clicked on
        //..................................................................................................
        //
        refreshBoard()

        // if no piece is selected + an empty square is clicked
        if (!selectedPiece && piece === null) {
            console.log("click")
            return
        }
        // if no piece is selected and a non-empty square is clicked:
        if (!selectedPiece) {
            selectNewPiece(piece)
            console.log(piece)
            return
        }
        const newCoords = [y, x]
        console.log(selectedPiece)
        const legalMoves = selectedPiece?.getLegalMoves(board)

        const isValidMove = boardTools.movesetContainsMove(legalMoves, newCoords)
        const isSamePiece = selectedPiece.coords === [y, x]

        if (isSamePiece) {
            selectedPiece.deselectPiece()
            setSelectedPiece(null)
            return
        }
        // if this is a valid attempt to move a selected piece:
        if (isValidMove) {
            const newBoard = handlePieceMove(y, x)
            setBoard(newBoard)
            return
        }
        // if a piece is selected but attempts to move to a non-empty, invalid square:
        if (board !== null) {
            if (board[y][x] !== null) {
                selectNewPiece(piece)
            }
        }

        return
    }

    return (
        <div className="board" >
            {
                board.map((row, indexY) => {

                    return row.map((piece, indexX) => {
                        let className = boardTools.getSquareClassName(piece, indexY, indexX)
                        const clickFunction = () => handleClick(piece, indexY, indexX)

                        return (
                            <div className={`square ${indexX + 1} row-${indexY + 1}`}>
                                <button className={className} onClick={clickFunction} >
                                    {
                                        piece ? <PieceImage piece={piece} /> : null
                                    }
                                </button>
                            </div>
                        )
                    })
                })
            }
        </div >
    )
}
export { Board }