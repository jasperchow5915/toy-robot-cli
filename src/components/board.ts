const DEFAULT_MAX = 5;
const DEFAULT_MIN = 0;

interface Board {
    minSize: number;
    maxSize: number;
}

class Board {

    constructor() {
        this.minSize = DEFAULT_MIN;
        this.maxSize = DEFAULT_MAX;
    }
    public outOfBounds = (n: number) => n < this.minSize || n >= this.maxSize
}

export default Board