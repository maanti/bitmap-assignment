import DistanceMap from '../lib/DistanceMap';

class StdoutOutput {
  /**
   * Writes 2D array with distances to the standard output
   * @param {DistanceMap} distanceMap
   */
  public static printDistances(distanceMap: DistanceMap): void {
    process.stdout.write('\n');
    for (let i = 0; i < distanceMap.getNDimension(); i++) {
      for (let j = 0; j < distanceMap.getMDimension(); j++) {
        process.stdout.write(`${distanceMap.getDistance(i, j)} `);
      }
      process.stdout.write('\n');
    }
  }
}

export default StdoutOutput;
