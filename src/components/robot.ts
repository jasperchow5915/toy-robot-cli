import { Directions, IPosition, ICoordinates, IMove, Actions, Rotation, CompassMap } from "./constants";

interface Robot {
  currentDirection: Directions | undefined
  currentPosition: IPosition | undefined
}

class Robot {

  constructor() {
    this.currentPosition = undefined;
    this.currentDirection = undefined;
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
    } else {
      const resultDirection = CompassMap[this.currentDirection][turnDirection];
      if (resultDirection) {
        this.currentDirection = resultDirection;
      }
      return true;
    }
  };

  public turnRight = () => this.turn(Rotation.RIGHT)
  public turnLeft = () => this.turn(Rotation.LEFT)
  public report = () => (!this.currentPosition || !this.currentDirection) ? false
    : {
      ...this.currentPosition,
      direction: this.currentDirection
    }
}

export default Robot;