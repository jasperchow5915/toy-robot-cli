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
    LEFT = 'left',
    RIGHT = 'right'
}

export interface MapElement {
    value: Directions
    left: Directions
    right: Directions
}

export type CompassMap = {
    [key in Directions]: MapElement
}

export const CompassMap: CompassMap = {
    NORTH: {
        value: Directions.NORTH,
        left: Directions.WEST,
        right: Directions.EAST
    },
    EAST: {
        value: Directions.EAST,
        left: Directions.NORTH,
        right: Directions.SOUTH
    },
    SOUTH: {
        value: Directions.SOUTH,
        left: Directions.EAST,
        right: Directions.WEST
    },
    WEST: {
        value: Directions.WEST,
        left: Directions.SOUTH,
        right: Directions.NORTH
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