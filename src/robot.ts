import { Directions, IPosition, ICoordinates, IMove, Actions, Rotation, CompassMap } from "./constants";

export class Robot {
  private currentDirection: Directions | undefined
  private currentPosition: IPosition | undefined
  private isPlaced: boolean

  constructor() {
    this.currentPosition = undefined;
    this.currentDirection = undefined;
    this.isPlaced = false;
  }

  private place = ({ x, y, direction }: ICoordinates) => {
    this.currentPosition = { x, y };
    this.currentDirection = direction;
    return true;
  }

  private move = ({ axis, action }: IMove) => {
    if (this.currentPosition) {
      if (action === Actions.Forward) {
        ++this.currentPosition[axis];
      }
      if (action === Actions.Backward) {
        --this.currentPosition[axis];
      }
      return true;
    }
  }

  private turn = (turnDirection: Rotation) => {
    if (!this.currentPosition || !this.currentDirection) {
      return false;
    } else {
      const resultDirection = CompassMap[this.currentDirection][turnDirection];
      if (resultDirection) {
        this.currentDirection = resultDirection;
      }
      return true;
    }
  };

  private turnRight = () => this.turn(Rotation.RIGHT)
  private turnLeft = () => this.turn(Rotation.LEFT)
  private report = () => (!this.currentPosition || !this.currentDirection) ? false
    : {
      ...this.currentPosition,
      direction: this.currentDirection
    }
}