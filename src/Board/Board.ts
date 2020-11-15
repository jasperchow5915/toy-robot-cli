import * as BoardConfig from './Board.config'

interface IPosition {
    x: number
    y: number
}

class Board {
    public minX: number = BoardConfig.Board_X_ORIGIN;
    public minY: number = BoardConfig.Board_Y_ORIGIN;
    public maxX: number = BoardConfig.Board_X_ORIGIN;
    public maxY: number = BoardConfig.Board_Y_ORIGIN;

    public isValidPosition = (position: IPosition) => position.x >= this.minX && position.y >= this.minY && position.x <= this.maxX && position.y <= this.maxY;
}

