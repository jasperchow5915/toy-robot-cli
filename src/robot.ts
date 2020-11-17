import { Directions, IPosition, ICoordinates, IMove, Actions, Rotation, CompassMap } from "./constant";


export class ToyRobot {
  private currentDirection: Directions
  private currentPosition: IPosition
  private isPlaced: boolean

  constructor() {
    this.currentPosition = undefined;
    this.currentDirection = undefined;
    this.isPlaced = false;
  }

  public place = ({ x, y, direction }: ICoordinates) => {
    this.currentPosition = { x, y };
    this.currentDirection = direction;
    return true;
  }

  public move = ({ axis, action }: IMove) => {
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

  public turn = (turnDirection: Rotation) => {
    if (!this.currentPosition || !this.currentDirection) {
      return false;
    }

    var resultDirection = CompassMap[this.currentDirection][turnDirection];

    if (resultDirection) {
      this.currentDirection = resultDirection;
    }

    return true;
  };

  public report = () => {
    if (!this.currentPosition || !this.currentDirection) {
      return false;
    }
    else {
      return {
        ...this.currentPosition,
        direction: this.currentDirection
      }
    }
  }
}