import { Pixel } from '../DistanceFinder';

type BitMapData = Array<Array<Pixel>>;

class BitMap {
  private nDimension: number;

  private mDimension: number;

  private readonly data: BitMapData;

  constructor(nDimension?: number, mDimension?: number, data?: BitMapData) {
    this.nDimension = nDimension || NaN;
    this.mDimension = mDimension || NaN;
    this.data = data || [];
  }

  public getPixel(i: number, j: number): Pixel {
    return this.data[i][j];
  }

  public setNDimension(nDimension: number): void {
    this.nDimension = nDimension;
  }

  public getNDimension(): number {
    return this.nDimension;
  }

  public setMDimension(mDimension: number): void {
    this.mDimension = mDimension;
  }

  public getMDimension(): number {
    return this.mDimension;
  }

  public addRow(row: number[]): void {
    this.data.push(row);
  }
}

export default BitMap;
