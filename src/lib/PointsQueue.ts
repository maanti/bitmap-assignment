import { Point } from '../DistanceFinder';

type Queue = Array<Point>;

class PointsQueue {
  private queue: Queue = [];

  public push(point: Point): void {
    this.queue.push(point);
  }

  public shift(): Point {
    return this.queue.shift() as Point;
  }

  public size(): number {
    return this.queue.length;
  }
}

export default PointsQueue;
