import BitMap from './BitMap';
import { Pixel } from '../DistanceFinder';

type DistanceData = Array<Array<number>>;

class DistanceMap {
  private readonly data: DistanceData;

  constructor(data?: DistanceData) {
    this.data = data || [];
  }

  public static createInstance(
    nDimension: number,
    mDimension: number,
    { fillWith }: {fillWith: number},
  ): DistanceMap {
    return new DistanceMap(new Array(nDimension)
      .fill(0)
      .map(
        () => new Array(mDimension)
          .fill(fillWith),
      ));
  }

  public setDistance(i: number, j: number, value: number): void {
    this.data[i][j] = value;
  }

  public getDistance(i: number, j: number): number {
    return this.data[i][j];
  }

  public getNDimension(): number {
    return this.data.length;
  }

  public getMDimension(): number {
    return this.data[0] && this.data[0].length;
  }

  public initialize(bitMap: BitMap): void {
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
