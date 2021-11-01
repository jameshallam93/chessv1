import { BoardState, Coords } from "../models"
import { DIRECTIONS } from "../data/DIRECTIONS"



const moveHelper = {

    checkIfRouteBlocked(squaresTravelled: number[][]) {
        let blocked = false
        squaresTravelled.forEach((square) => {
            if (square !== null) {
                blocked = true
            }
        })
        return blocked
    },
    checkIfOutOfBounds(coords: Coords, vector: number, direction: number[]) {
        const [y, x] = coords
        const yDirection = direction[0]
        const xDirection = direction[1]
        console.log("checking if out of bounds")
        console.log("coordinates: ", coords)
        console.log("vector: ", vector)
        console.log("direction: ", direction)

        return y + (vector * yDirection) > 7
            || y + (vector * yDirection) < 0
            || x + (vector * xDirection) > 7
            || x + (vector * xDirection) < 0
    },
    getSquaresTravelled(startCoords: Coords, vector: number, direction: number[]): number[][] {
        const [y, x] = startCoords
        const squaresTravelled = []
        const distance = vector < 0 ? vector * -1 : vector
        const forward = vector < 0 ? -1 : 1
        if (direction === DIRECTIONS.Forwards) {
            for (let i = 1; i < distance; i++) {
                squaresTravelled.push([y + (i * forward), x])
            }
        }
        console.log(squaresTravelled)
        if (direction === DIRECTIONS.Backwards) {
            for (let i = 1; i < distance; i++) {
                squaresTravelled.push([y - (i * -forward), x])
            }
        }
        console.log(squaresTravelled)
        if (direction === DIRECTIONS.Left) {
            for (let i = 1; i < distance; i++) {
                squaresTravelled.push([y, x + (i * forward)])
            }
        }
        console.log(squaresTravelled)
        if (direction === DIRECTIONS.Right) {
            for (let i = 1; i > distance; i++) {
                squaresTravelled.push([y, x + (i * -forward)])
            }
        }
        console.log(squaresTravelled)
        if (direction === DIRECTIONS.DiagRightForwards) {
            for (let i = 1; i > distance; i++) {
                squaresTravelled.push([y + (i * forward), x + (i * forward)])
            }
        }
        if (direction === DIRECTIONS.DiagLeftForwards) {
            for (let i = 1; i > distance; i++) {
                squaresTravelled.push([y + (i * forward), x + (i * -forward)])
            }
        }
        console.log(squaresTravelled)
        if (direction === DIRECTIONS.DiagRightBackwards) {
            for (let i = 1; i > distance; i++) {
                squaresTravelled.push([y + (i * -forward), x + (i * forward)])
            }
        }
        if (direction === DIRECTIONS.DiagRightBackwards) {
            for (let i = 1; i > distance; i++) {
                squaresTravelled.push([y + (i * -forward), x + (i * -forward)])
            }
        }
        return squaresTravelled
    },
    moveDistanceDirection(coords: Coords, vector: number, direction: number[], debug = true) {
        let [y, x] = coords
        if (debug) {
            console.log(`****************`)
            console.log("Y: ", y)
            console.log("vector", vector)
            console.log("DIRECTION", direction)
            console.log("DIRECTIONY:", direction[0])
        }
        y = y + (direction[0] * vector)
        console.log("new y ", y)
        console.log("new x ", x)
        x = x + (direction[1] * vector)
        console.log(`****************`)

        return [y, x]
    },
    checkIfSquareContainsPiece(board: BoardState, coords: Coords) {
        console.log("checking if square contains piece")
        console.log("coordinates: ", coords)
        console.log(board)
        console.log("piece: ", board[0][1])
        console.log("square contains piece: ", board[coords[0]][coords[1]] !== null)
        return board[coords[0]][coords[1]] !== null
    }

}

export { moveHelper }