import { images } from "./imageSources"

const PieceImage = (piece) => {
    const getImage = () => {
        const pieceSprite = piece.piece.sprite
        return images[pieceSprite]
    }
    const imageSrc = getImage()
    return (
        <div className="piece-image">
            <img src={imageSrc} alt="pic not found" />
        </div>
    )
}

export { PieceImage }