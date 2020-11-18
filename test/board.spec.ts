import Board from "../src/components/board";


const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("#Board matrix", () => {
    test("Can instantiate a new board", () => {
        expect(new Board()).not.toBeNull();
    });
});

describe("#Position outside the board", () => {
    test("returns false for allowed values (0 to 4)", () => {
        const table = new Board();
        expect(table.outOfBounds(randomInt(0, 4))).toBeFalsy();
    });
    test("returns true for non-allowed values", () => {
        const table = new Board();
        expect(table.outOfBounds(5)).toBeTruthy();
        expect(table.outOfBounds(-1)).toBeTruthy();
    });
});
