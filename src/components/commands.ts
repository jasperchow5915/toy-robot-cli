import * as inquirer from "inquirer";
import { Directions } from "./constants";
import Separator from "inquirer/lib/objects/separator";

const commands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT', new inquirer.Separator(), 'EXIT'];
const directions = Object.values(Directions)

export const actionsList: ICommand[] = [{
    type: 'list',
    name: 'command',
    message: 'Choose the action you would like the Robot to take',
    choices: commands
}];
export const selectX: ICommand[] = [{
    type: 'input',
    name: 'x',
    message: 'Please provide the X coordinate for the robot',
}];
export const selectY: ICommand[] = [{
    type: 'input',
    name: 'y',
    message: 'Please provide the Y coordinate for the robot',
}];
export const selectDirection: ICommand[] = [{
    type: 'list',
    name: 'direction',
    message: 'Please provide the direction for the robot',
    choices: directions,
}];

export interface ICommand {
    type: 'input' | 'list'
    name: string
    message: string
    choices?: (string | Separator)[]
}