export interface IPosition {
    x: number;
    y: number;
}

export interface IRobotOptions {
    position: IPosition;
    direction: Directions;
}

export interface ICoordinates extends IPosition {
    direction: Directions
}

export enum Directions {
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    NORTH = 'NORTH',
}

export enum Rotation {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export interface MapElement {
    VALUE: Directions
    LEFT: Directions
    RIGHT: Directions
}

export type CompassMap = {
    [key in Directions]: MapElement
}

export const CompassMap: CompassMap = {
    NORTH: {
        VALUE: Directions.NORTH,
        LEFT: Directions.WEST,
        RIGHT: Directions.EAST
    },
    EAST: {
        VALUE: Directions.EAST,
        LEFT: Directions.NORTH,
        RIGHT: Directions.SOUTH
    },
    SOUTH: {
        VALUE: Directions.SOUTH,
        LEFT: Directions.EAST,
        RIGHT: Directions.WEST
    },
    WEST: {
        VALUE: Directions.WEST,
        LEFT: Directions.SOUTH,
        RIGHT: Directions.NORTH
    }
}

export interface IMove {
    axis: keyof IPosition;
    action: Actions;
}

export enum Actions {
    Forward,
    Backward
}

export const message = {
    intro: "Welcome! My name is Charlie. I am a toy robot and next to me is a 5x5 table. To start the interation, please PLACE me on the table first. I can MOVE one square at a time, turn LEFT or RIGHT and REPORT my own location.",
    choice: "Choose the action you would like the Robot to take",
    selectX: "Please provide the X coordinate for the robot",
    selectY: "Please provide the Y coordinate for the robot",
    selectDirection: "Please provide the direction for the robot",
    invalidNum: "Please provide a valid number.",
    invalidPlace: "You can't place me here!",
    invalidReport: "There is nothing to report.",
    move: "I have moved one square.",
    invalidMove: "You can't move me there!",
    turn: "I've turned 90 degrees to the ",
    invalidTurn: "I can't turn. Please PLACE me on the table first.",
    exit: "Thanks for playing!"
}