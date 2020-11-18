export interface IPosition {
    x: number;
    y: number;
}

interface IRobotState {
    currentPosition: IPosition | undefined;
    currentDirection: Directions | undefined;
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