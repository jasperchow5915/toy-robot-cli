import * as inquirer from "inquirer";
import { Directions, message } from "./constants";
import Separator from "inquirer/lib/objects/separator";

const commands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT', new inquirer.Separator(), 'EXIT'];
const directions = Object.values(Directions)

export const actionsList: ICommand[] = [{
    type: 'list',
    name: 'command',
    message: message.choice,
    choices: commands
}];
export const selectX: ICommand[] = [{
    type: 'input',
    name: 'x',
    message: message.selectX,
}];
export const selectY: ICommand[] = [{
    type: 'input',
    name: 'y',
    message: message.selectY,
}];
export const selectDirection: ICommand[] = [{
    type: 'list',
    name: 'direction',
    message: message.selectDirection,
    choices: directions,
}];

export interface ICommand {
    type: 'input' | 'list'
    name: string
    message: string
    choices?: (string | Separator)[]
}