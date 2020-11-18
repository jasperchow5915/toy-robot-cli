import Robot from "../src/components/robot";
import { Directions, Actions } from "../src/components/constants";

describe("#Start Up", () => {
    test("A new toy robot should be initialised", () => {
        expect(new Robot()).not.toBeNull();
    });
});

describe("#Placing a toy robot", () => {
    let bot: Robot;

    beforeEach(() => {
        bot = new Robot();
    })

    test("Can place a new toy robot on the board", () => {
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.NORTH });
    });
});

describe("#Moving a toy robot", () => {
    let bot: Robot;

    beforeEach(() => {
        bot = new Robot();
    })

    test("Cannot move a bot that isn't on the board", () => {
        expect(bot.move({ axis: 'x', action: Actions.Forward })).toBeFalsy();
    });

    test("Can move a bot that is on the board facing NORTH", () => {
        const location = {
            x: 0,
            y: 1,
            direction: Directions.NORTH
        }
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        expect(bot.move({ axis: 'y', action: Actions.Forward })).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });

    test("Can move a bot that is on the board facing EAST", () => {
        const location = {
            x: 1,
            y: 0,
            direction: Directions.EAST
        }
        bot.place({ x: 0, y: 0, direction: Directions.EAST });
        expect(bot.move({ axis: 'x', action: Actions.Forward })).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });

    test("Can move a bot that is on the board facing SOUTH", () => {
        const location = {
            x: 0,
            y: 0,
            direction: Directions.SOUTH
        }
        bot.place({ x: 0, y: 1, direction: Directions.SOUTH });
        expect(bot.move({ axis: 'y', action: Actions.Backward })).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });

    test("Can move a bot that is on the board facing WEST", () => {
        const location = {
            x: 0,
            y: 0,
            direction: Directions.WEST
        }
        bot.place({ x: 1, y: 0, direction: Directions.WEST });
        expect(bot.move({ axis: 'x', action: Actions.Backward })).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });
});

describe("#TurnLeft", () => {
    let bot: Robot;

    beforeEach(() => {
        bot = new Robot();
    })

    test("Cannot turn left before the bot is placed", () => {
        expect(bot.turnLeft()).toBeFalsy();
        expect(bot.report()).toEqual(false);
    });

    test("Turning left changes from NORTH to WEST", () => {
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.WEST });
    });

    test("Turning left changes from EAST to NORTH", () => {
        bot.place({ x: 0, y: 0, direction: Directions.EAST });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.NORTH });
    });

    test("Turning left changes from SOUTH to EAST", () => {
        bot.place({ x: 0, y: 0, direction: Directions.SOUTH });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.EAST });
    });

    test("Turning left changes from WEST to SOUTH", () => {
        bot.place({ x: 0, y: 0, direction: Directions.WEST });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.SOUTH });
    });

    test("Turning left * 4 times", () => {
        bot.place({ x: 3, y: 3, direction: Directions.NORTH });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.WEST });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.SOUTH });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.EAST });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.NORTH });
    });
});

describe("#Turning right", () => {
    let bot: Robot;

    beforeEach(() => {
        bot = new Robot();
    })

    test("Cannot change direction of a bot that isn't placed", () => {
        expect(bot.turnRight()).toBeFalsy();
    });

    test("Turning right changes from NORTH to EAST", () => {
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.EAST });
    });

    test("Turning right changes from EAST to SOUTH", () => {
        bot.place({ x: 0, y: 0, direction: Directions.EAST });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.SOUTH });
    });

    test("Turning right changes from SOUTH to WEST", () => {
        bot.place({ x: 0, y: 0, direction: Directions.SOUTH });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.WEST });
    });

    test("Turning right changes from WEST to NORTH", () => {
        bot.place({ x: 0, y: 0, direction: Directions.WEST });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: Directions.NORTH });
    });

    test("Turning right * 4 times", () => {
        bot.place({ x: 3, y: 3, direction: Directions.NORTH });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.EAST });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.SOUTH });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.WEST });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: Directions.NORTH });
    });

});

describe("#Reporting location of toy robot", () => {
    let bot: Robot;

    beforeEach(() => {
        bot = new Robot();
    })

    test("Cannot report location of a bot before it is placed", () => {
        expect(bot.report()).toBeFalsy();
    });

    test("Can report location of a bot that is on the board", () => {
        const location = {
            x: 0,
            y: 0,
            direction: Directions.NORTH
        }
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        expect(bot.report()).toEqual(location);
    });

    test("Can report different location of a bot that is on the board", () => {
        const location = {
            x: 1,
            y: 4,
            direction: Directions.WEST
        }
        bot.place(location);
        expect(bot.report()).toEqual(location);
    });
});

describe("#Running through the example input on the specification", () => {
    let bot: Robot;

    beforeEach(() => {
        bot = new Robot();
    })

    test("PLACE (0,0,NORTH) -> MOVE -> REPORT", () => {
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        bot.move({ axis: 'y', action: Actions.Forward });
        expect(bot.report()).toEqual({ x: 0, y: 1, direction: 'NORTH' });
    });

    test("PLACE (0,0,NORTH) -> LEFT -> REPORT", () => {
        bot.place({ x: 0, y: 0, direction: Directions.NORTH });
        bot.turnLeft();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'WEST' });
    });

    test("PLACE (1,2,EAST) -> MOVE -> MOVE -> LEFT -> MOVE -> REPORT", () => {
        bot.place({ x: 1, y: 2, direction: Directions.EAST });
        bot.move({ axis: 'x', action: Actions.Forward });
        bot.move({ axis: 'x', action: Actions.Forward });
        bot.turnLeft();
        bot.move({ axis: 'y', action: Actions.Forward });
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: 'NORTH' });
    });

});