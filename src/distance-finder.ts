import PointsQueue from './points-queue';

enum Pixel {
    Black = 0,
    White
}

type Point = {
    x: number,
    y: number
}

type BitMap = Array<Array<Pixel>>;

type Distances = Array<Array<number>>;

class DistanceFinder {
  private readonly bitMap: BitMap;

  private distances: Distances = [[]];

  private pointsQueue: PointsQueue;

  private readonly n: number;

  private readonly m: number;

  private areDistancesComputed: boolean = false;

  constructor(bitMap: BitMap) {
    this.bitMap = bitMap;

    this.n = bitMap.length;
    this.m = bitMap[0].length;

    this.pointsQueue = new PointsQueue();

    this.initializeDistances();
  }

  /**
     * Fills distances matrix with initial values
     * (0 for white pixels and infinity for black pixels)
     * @private
     */
  private initializeDistances(): void {
    this.distances = this.createDistances2dArray({ fillWith: Number.NaN });
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        const pixel = this.bitMap[i][j];
        if (pixel === Pixel.White) {
          this.distances[i][j] = 0;
        }
      }
    }
  }

  /**
     * Creates a 2-dimensional array filled with 'fillWith' value
     * @param fillWith
     * @private
     */
  private createDistances2dArray({ fillWith }: {fillWith: any}) {
    return new Array(this.n).fill(0).map(() => new Array(this.m).fill(fillWith));
  }

  /**
     * Returns distances matrix for the bitmap.
     * If already computed - returns cached value
     */
  public getDistances(): Distances {
    if (!this.areDistancesComputed) {
      this.distances = this.findDistances();
    }

    return this.distances;
  }

  /**
   * Calculate distances from each back pixel to the nearest white pixel
   * @private
   */
  private findDistances(): Distances {
    // Push all white points to the queue
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        if (this.bitMap[i][j] === Pixel.White) {
          this.pointsQueue.push({ x: i, y: j });
        }
      }
    }

    this.traverseBitMap();

    // Flag that signalizes that we already have distances computed and can use cache
    this.areDistancesComputed = true;

    return this.distances;
  }

  /**
   * Breadth-first traversal starting from white pixels
   * and going through all the pixels
   * @private
   */
  private traverseBitMap() {
    while (this.pointsQueue.size() > 0) {
      const { x, y } = this.pointsQueue.shift();
      this.addDistance(x + 1, y, this.distances[x][y] + 1);
      this.addDistance(x - 1, y, this.distances[x][y] + 1);

      this.addDistance(x, y + 1, this.distances[x][y] + 1);
      this.addDistance(x, y - 1, this.distances[x][y] + 1);
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
    const isXOutOfBounds = (x < 0) || (x >= this.n);
    const isYOutOfBounds = (y < 0) || (y >= this.m);

    if (isXOutOfBounds || isYOutOfBounds) {
      return;
    }

    // Pixel is already handled
    if (!Number.isNaN(this.distances[x][y])) {
      return;
    }

    this.distances[x][y] = distance;

    // After white points we will start processing points with newly set distances
    this.pointsQueue.push({ x, y });
  }
}

export default DistanceFinder;

export {
  BitMap,
  Pixel,
  Point,
  Distances,
};
