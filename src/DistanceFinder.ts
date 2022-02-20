import PointsQueue from './lib/PointsQueue';
import BitMap from './lib/BitMap';
import DistanceMap from './lib/DistanceMap';

enum Pixel {
    Black = 0,
    White
}

type Point = {
    x: number,
    y: number
}

class DistanceFinder {
  private readonly bitMap: BitMap;

  private readonly distanceMap: DistanceMap;

  private pointsQueue: PointsQueue;

  private areDistancesComputed: boolean = false;

  constructor(bitMap: BitMap) {
    this.bitMap = bitMap;
    this.pointsQueue = new PointsQueue();
    this.distanceMap = DistanceMap.createInstance(
      this.bitMap.getNDimension(),
      this.bitMap.getMDimension(),
      { fillWith: Number.NaN },
    );
    this.distanceMap.initialize(this.bitMap);
  }

  /**
     * Returns distances matrix for the bitmap.
     * If already computed - returns cached value
     */
  public getDistances(): DistanceMap {
    if (!this.areDistancesComputed) {
      this.computeDistances();
    }

    return this.distanceMap;
  }

  /**
   * Calculate distances from each back pixel to the nearest white pixel
   * @private
   */
  private computeDistances(): DistanceMap {
    // Push all white points to the queue
    for (let i = 0; i < this.bitMap.getNDimension(); i++) {
      for (let j = 0; j < this.bitMap.getMDimension(); j++) {
        if (this.bitMap.getPixel(i, j) === Pixel.White) {
          this.pointsQueue.push({ x: i, y: j });
        }
      }
    }

    this.traverseBitMap();

    // Flag that signalizes that we already have distances computed and can use cache
    this.areDistancesComputed = true;

    return this.distanceMap;
  }

  /**
   * Breadth-first traversal starting from white pixels
   * and going through all the pixels
   * @private
   */
  private traverseBitMap() {
    while (this.pointsQueue.size() > 0) {
      const { x, y } = this.pointsQueue.shift();

      const distance = this.distanceMap.getDistance(x, y);
      const newDistance = distance + 1;

      this.addDistance(x + 1, y, newDistance);
      this.addDistance(x - 1, y, newDistance);
      this.addDistance(x, y + 1, newDistance);
      this.addDistance(x, y - 1, newDistance);
    }
  }

  /**
   * Sets distance to the pixel and pushes it to the queue
   * @param {number} x
   * @param {number} y
   * @param {number} distance
   * @private
   */
  private addDistance(x: number, y: number, distance: number) {
    const isXOutOfBounds = (x < 0) || (x >= this.bitMap.getNDimension());
    const isYOutOfBounds = (y < 0) || (y >= this.bitMap.getMDimension());

    if (isXOutOfBounds || isYOutOfBounds) {
      return;
    }

    // Pixel is already handled
    if (!Number.isNaN(this.distanceMap.getDistance(x, y))) {
      return;
    }

    this.distanceMap.setDistance(x, y, distance);

    // After white points we will start processing points with newly set distances
    this.pointsQueue.push({ x, y });
  }
}

export default DistanceFinder;

export {
  BitMap,
  Pixel,
  Point,
};
