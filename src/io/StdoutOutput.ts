import { Distances } from '../DistanceFinder';

class StdoutOutput {
  public static printDistances(distances: Distances): void {
    process.stdout.write('\n');
    for (let i = 0; i < distances.length; i++) {
      for (let j = 0; j < distances[0].length; j++) {
        process.stdout.write(`${distances[i][j]} `);
      }
      process.stdout.write('\n');
    }
  }
}

export default StdoutOutput;
