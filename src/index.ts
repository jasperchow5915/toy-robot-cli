import inquirer from 'inquirer';
import { actionsList, selectX, selectY, selectDirection } from './commands';
import { Directions, Rotation } from './constants';
import World from './world';

const logger = require('./common/logger');

const world = new World();

interface ICoordindate {
    x?: number,
    y?: number
}

const message = {
    intro: "Welcome! My name is Charlie. I am a toy robot and next to me is a 5x5 table. I can MOVE one square at a time, turn LEFT or RIGHT and REPORT my own location. If you want to interact with me, please make sure to PLACE me on the table first.",
    invalidNum: "Please provide a valid number.",
    invalidPlace: "You can't place me here!",
    invalidReport: "There is nothing to report.",
    move: "I have moved one square.",
    invalidMove: "You can't move me there!",
    turn: "I've turned 90 degrees to the ",
    invalidTurn: "I can't turn, and otherwise will fall off the table",
    exit: "Thanks for playing!"
}

let coordinates: ICoordindate = {};

const validateXCoordinate = (input: any) => {
    const xcoord = +input
    if (isNaN(xcoord)) {
        return message.invalidNum
    }
    coordinates.x = xcoord
    return true
}

const validateYCoordinate = (input: any) => {
    const ycoord = +input;
    if (isNaN(ycoord)) {
        return message.invalidNum
    }
    coordinates.y = ycoord
    return true
}

const validatePlacement = (input: Directions) => {
    if (coordinates.x !== undefined
        && coordinates.y !== undefined
        && world.execute(world, 'placeCommand', { x: coordinates.x, y: coordinates.y, direction: input })) {
        return {
            level: 'SUCCESS',
            message: `Placing the robot on the table at ${coordinates.x}, ${coordinates.y} facing ${input}`
        }
    }
    else {
        coordinates = {};
        return {
            level: 'ERROR',
            message: message.invalidPlace
        }
    }
}

const start = async () => {
    logger.log(
        {
            level: "BEGIN",
            message: message.intro
        }
    );
    mainMenu();
}

const mainMenu = async () => {
    await inquirer
        .prompt(actionsList)
        .then(processInput)
}

const processInput = async (answer: { command: string }) => {
    if (answer.command === "PLACE") {
        await placeX();
    }
    if (answer.command === "MOVE") {
        await move();
    }
    if (answer.command === "LEFT") {
        await left();
    }
    if (answer.command === "RIGHT") {
        await right();
    }
    if (answer.command === 'REPORT') {
        await report();
    }
    if (answer.command === 'EXIT') {
        logger.log({ level: 'END', message: message.exit });
    }
}

const report = async () => {
    const report = world.execute(world, 'reportCommand');
    if (report) {
        logger.log({ level: 'REPORT', message: `X: ${report.x}, Y: ${report.y}, DIRECTION: ${report.direction}` });
    } else {
        logger.log({ level: 'REPORT', message: message.invalidReport });
    }
    mainMenu();
}

const placeX = async () => {
    await inquirer
        .prompt(selectX)
        .then(async (answer: { x: any }) => {
            const isValid = validateXCoordinate(answer.x);
            if (isValid === true) {
                await placeY();
            } else {
                logger.log({ level: 'WARNING', message: isValid });
                placeX();
            }
        })
}

async function placeY() {
    await inquirer
        .prompt(selectY)
        .then((answer: { y: any }) => {
            const isValid = validateYCoordinate(answer.y);
            if (isValid === true) {
                placeDirection();
            } else {
                logger.log({ level: 'WARNING', message: isValid });
                placeY();
            }
        })
}

async function placeDirection() {
    await inquirer
        .prompt(selectDirection)
        .then((answer: { direction: Directions }) => {
            const isValid = validatePlacement(answer.direction);
            logger.log(isValid);
            mainMenu();
        })
}

async function move() {
    const canMove = world.execute(world, 'moveCommand');
    if (canMove) {
        logger.log({ level: 'SUCCESS', message: message.move });
    } else {
        logger.log({ level: 'ERROR', message: message.invalidMove });
    }
    mainMenu();
}

async function left() {
    const didTurnLeft = world.execute(world, 'turnCommand', Rotation.LEFT);
    if (didTurnLeft) {
        logger.log({ level: 'SUCCESS', message: message.turn + " left." });
    } else {
        logger.log({ level: 'ERROR', message: message.invalidTurn });
    }
    mainMenu();
}

async function right() {
    const didTurnRight = world.execute(world, 'turnCommand', Rotation.RIGHT);
    if (didTurnRight) {
        logger.log({ level: 'SUCCESS', message: message.turn + " right." });
    } else {
        logger.log({ level: 'ERROR', message: message.invalidTurn });
    }
    mainMenu();
}

module.exports = start;