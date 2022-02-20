import DistanceMap from '../lib/DistanceMap';
import WritableStream = NodeJS.WritableStream;

class StdoutOutput {
  /**
   * Writes 2D array with distances to the standard output
   * @param {DistanceMap} distanceMap
   * @param out
   */
  public static printDistanceMap(
    distanceMap: DistanceMap,
    out: WritableStream = process.stdout,
  ): void {
    out.write('\n');
    for (let i = 0; i < distanceMap.getNDimension(); i++) {
      for (let j = 0; j < distanceMap.getMDimension(); j++) {
        out.write(`${distanceMap.getDistance(i, j)} `);
      }
      out.write('\n');
    }
  }
}

export default StdoutOutput;
