import World from "../src/components/world";
import { Directions, Rotation, Actions } from "../src/components/constants";

describe("#Simulator", () => {
    test("Can a new simulator be initialised", () => {
        expect(new World()).not.toBeNull();
    });

});

describe("#Place command", () => {
    let world: World;

    beforeEach(() => {
        world = new World();
    })

    test("Can place a new toy robot on the board", () => {
        expect(world.execute(world, 'placeCommand', { x: 0, y: 0, direction: 'NORTH' })).toBeTruthy();
        expect(world.execute(world, 'reportCommand')).toEqual({ x: 0, y: 0, direction: 'NORTH' });
    });

    test("Can place a new toy robot on the board", () => {
        expect(world.execute(world, 'placeCommand', { x: 2, y: 3, direction: 'NORTH' })).toBeTruthy();
        expect(world.execute(world, 'reportCommand')).toEqual({ x: 2, y: 3, direction: 'NORTH' });
    });

    test("Can NOT place a new toy robot off the board", () => {
        expect(world.execute(world, 'placeCommand', { x: 5, y: 5, direction: 'NORTH' })).toBeFalsy();
        expect(world.execute(world, 'reportCommand')).toEqual(false);
    });

    test("Can handle incorrect coordinate input ", () => {
        const location = {
            x: 'Melbourne' as unknown as number,
            y: 'donut' as unknown as number,
            direction: Directions.NORTH
        }
        expect(world.execute(world, 'placeCommand', location)).toBeFalsy();
        expect(world.execute(world, 'reportCommand')).toEqual(false);
    });

    test("Can handle incorrect direction input ", () => {
        const location = {
            x: 1,
            y: 2,
            direction: 'Shellfish' as Directions
        }
        expect(world.execute(world, 'placeCommand', location)).toBeFalsy();
        expect(world.execute(world, 'reportCommand')).toEqual(false);
    });

    test("Can handle missing parameters", () => {
        const undefinedDirection = {
            x: 1,
            y: 2,
            direction: 'Sword' as Directions
        }
        const undefinedY = {
            x: 1,
            y: undefined as unknown as number,
            direction: Directions.NORTH
        }
        const nullX = {
            x: null as unknown as number,
            y: 2,
            direction: Directions.WEST
        }
        expect(world.execute(world, 'placeCommand', undefinedDirection)).toBeFalsy();
        expect(world.execute(world, 'placeCommand', undefinedY)).toBeFalsy();
        expect(world.execute(world, 'placeCommand', nullX)).toBeFalsy();
        expect(world.execute(world, 'reportCommand')).toEqual(false);
    });
});

describe("#Move command", () => {
    let simulator: World;

    beforeEach(() => {
        simulator = new World();
    })

    test("Can move a bot to a position on board", () => {
        const place1 = {
            x: 2,
            y: 2,
            direction: Directions.NORTH
        }
        const place2 = {
            x: 3,
            y: 2,
            direction: Directions.NORTH
        }
        simulator.execute(simulator, 'placeCommand', place1);
        expect(simulator.execute(simulator, 'moveCommand')).toBeTruthy();
        simulator.execute(simulator, 'placeCommand', place2);
        expect(simulator.execute(simulator, 'moveCommand')).toBeTruthy();
    });

    test("Can't move a bot to a position off board, facing NORTH", () => {
        const place1 = {
            x: 4,
            y: 4,
            direction: Directions.NORTH
        }
        const place2 = {
            x: 2,
            y: 4,
            direction: Directions.NORTH
        }
        simulator.execute(simulator, 'placeCommand', place1);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
        simulator.execute(simulator, 'placeCommand', place2);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
    });

    test("Can't move a bot to a position off board, facing EAST", () => {
        const place1 = {
            x: 4,
            y: 4,
            direction: Directions.EAST
        }
        const place2 = {
            x: 4,
            y: 0,
            direction: Directions.EAST
        }
        simulator.execute(simulator, 'placeCommand', place1);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
        simulator.execute(simulator, 'placeCommand', place2);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
    });

    test("Can't move a bot to a position off board, facing SOUTH", () => {
        const place1 = {
            x: 0,
            y: 0,
            direction: Directions.SOUTH
        }
        const place2 = {
            x: 4,
            y: 0,
            direction: Directions.SOUTH
        }
        simulator.execute(simulator, 'placeCommand', place1);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
        simulator.execute(simulator, 'placeCommand', place2);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
    });

    test("Can't move a bot to a position off board, facing WEST", () => {
        const place1 = {
            x: 0,
            y: 0,
            direction: Directions.WEST
        }
        const place2 = {
            x: 0,
            y: 4,
            direction: Directions.WEST
        }
        simulator.execute(simulator, 'placeCommand', place1);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
        simulator.execute(simulator, 'placeCommand', place2);
        expect(simulator.execute(simulator, 'moveCommand')).toBeFalsy();
    });
});

describe("#Turn command", () => {
    let simulation: World;

    beforeEach(() => {
        simulation = new World();
    })

    test("Can't turn a bot before placed on a board", () => {
        expect(simulation.execute(simulation, 'turnCommand', Rotation.LEFT)).toEqual(false);
    });

    test("Can turn a bot LEFT on a board", () => {
        const place = {
            x: 1,
            y: 1,
            direction: Directions.NORTH
        }
        simulation.execute(simulation, 'placeCommand', place);
        expect(simulation.execute(simulation, 'turnCommand', Rotation.LEFT)).toBeTruthy();
    });

    test("Can turn a bot RIGHT on a board", () => {
        const place = {
            x: 1,
            y: 1,
            direction: Directions.NORTH
        }
        simulation.execute(simulation, 'placeCommand', place);
        expect(simulation.execute(simulation, 'turnCommand', Rotation.RIGHT)).toBeTruthy();
    });
});

describe("#Running through the examples given in the specification", () => {
    let simulator: World;

    beforeEach(() => {
        simulator = new World();
    })

    test("PLACE (0,0,NORTH) -> MOVE -> REPORT", () => {
        simulator.execute(simulator, 'placeCommand', { x: 0, y: 0, direction: Directions.NORTH });
        expect(simulator.execute(simulator, 'moveCommand', { axis: 'y', action: Actions.Forward })).toBeTruthy();
        expect(simulator.execute(simulator, 'reportCommand')).toEqual({ x: 0, y: 1, direction: Directions.NORTH });
    });

    test("PLACE (0,0,NORTH) -> LEFT -> REPORT", () => {
        simulator.execute(simulator, 'placeCommand', { x: 0, y: 0, direction: Directions.NORTH });
        expect(simulator.execute(simulator, 'turnCommand', Rotation.LEFT)).toBeTruthy();
        expect(simulator.execute(simulator, 'reportCommand')).toEqual({ x: 0, y: 0, direction: Directions.WEST });
    });

    test("PLACE (1,2,EAST) -> MOVE -> MOVE -> LEFT -> MOVE -> REPORT", () => {
        simulator.execute(simulator, 'placeCommand', { x: 1, y: 2, direction: Directions.EAST });
        expect(simulator.execute(simulator, 'moveCommand', { axis: 'x', action: Actions.Forward })).toBeTruthy();
        expect(simulator.execute(simulator, 'moveCommand', { axis: 'x', action: Actions.Forward })).toBeTruthy();
        expect(simulator.execute(simulator, 'turnCommand', Rotation.LEFT)).toBeTruthy();
        expect(simulator.execute(simulator, 'moveCommand', { axis: 'y', action: Actions.Forward })).toBeTruthy();
        expect(simulator.execute(simulator, 'reportCommand')).toEqual({ x: 3, y: 3, direction: Directions.NORTH });
    });

});