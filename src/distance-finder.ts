interface BitMap {}
interface Distances {}

class DistanceFinder {
  private bitMap: BitMap;

  private distances: Distances = [];

  constructor(bitMap: BitMap) {
    this.bitMap = bitMap;
  }

  public getDistances(): Distances {
    if (!this.distances) {
      this.distances = DistanceFinder.findDistances();
    }
    return this.distances;
  }

  private static findDistances(): Distances {
    return [] as Distances;
  }
}

export default DistanceFinder;
