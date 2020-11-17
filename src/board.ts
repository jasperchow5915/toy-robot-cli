const DEFAULT_MAX = 5;
const DEFAULT_MIN = 0;
export class Board {
    public minSize: number;
    public maxSize: number;
    constructor() {
        this.minSize = DEFAULT_MIN;
        this.maxSize = DEFAULT_MAX;
    }
    public outOfBounds(n: number) {
        return (n < this.minSize || n >= this.maxSize)
    }
}

