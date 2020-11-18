import Board from "./board";
import Robot from "./robot";
import { Rotation, Directions, Actions, IMove, ICoordinates } from "./constants";

interface World {
    table: Board;
    robot: Robot;
}

class World {
    constructor() {
        this.table = new Board();
        this.robot = new Robot();
    }

    public execute(subject: any, command: string, params?: any) {
        return subject[command] && subject[command](params);
    }

    private executeOnRobot(command: string, params?: ICoordinates | IMove) {
        return this.execute(this.robot, command, params);
    }

    private placeCommand({ x, y, direction }: ICoordinates) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            return false;
        }
        if (typeof direction !== 'string' || !(Object.keys(Directions).includes(direction))) {
            return false;
        }
        if (this.table.outOfBounds(x) || this.table.outOfBounds(y)) {
            return false;
        } else {
            return this.executeOnRobot('place', { x, y, direction })
        }
    }

    private moveCommand() {
        if (!this.executeOnRobot('report')) {
            return false;
        }
        const { x, y, direction } = this.executeOnRobot('report');
        switch (direction) {
            case (Directions.NORTH):
                if (this.table.outOfBounds(y + 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'y', action: Actions.Forward });
                }
            case (Directions.EAST):
                if (this.table.outOfBounds(x + 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'x', action: Actions.Forward });
                }
            case (Directions.SOUTH):
                if (this.table.outOfBounds(y - 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'y', action: Actions.Backward });
                }
            case (Directions.WEST):
                if (this.table.outOfBounds(x - 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'x', action: Actions.Backward });
                }
        }
    }

    private turnCommand(rotation: Rotation) {
        if (rotation === Rotation.LEFT) {
            return this.executeOnRobot('turnLeft');
        }
        if (rotation === Rotation.RIGHT) {
            return this.executeOnRobot('turnRight');
        }
    }

    private reportCommand() {
        return this.executeOnRobot('report');
    }
}

export default World;