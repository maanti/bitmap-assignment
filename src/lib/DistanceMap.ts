import BitMap from './BitMap';
import { Pixel } from '../DistanceFinder';

type DistanceData = Array<Array<number>>;

class DistanceMap {
  private readonly data: DistanceData;

  public static createInstance(n: number, m: number, { fillWith }: {fillWith: any}) {
    return new DistanceMap(new Array(n)
      .fill(0)
      .map(
        () => new Array(m)
          .fill(fillWith),
      ));
  }

  constructor(data?: DistanceData) {
    this.data = data || [];
  }

  public setDistance(i: number, j: number, value: number) {
    this.data[i][j] = value;
  }

  public getDistance(i: number, j: number) {
    return this.data[i][j];
  }

  public getNDimension(): number {
    return this.data.length;
  }

  public getMDimension(): number {
    return this.data[0] && this.data[0].length;
  }

  public initialize(bitMap: BitMap) {
    for (let i = 0; i < bitMap.getNDimension(); i++) {
      for (let j = 0; j < bitMap.getMDimension(); j++) {
        if (bitMap.getPixel(i, j) === Pixel.White) {
          this.setDistance(i, j, 0);
        }
      }
    }
  }
}

export default DistanceMap;
