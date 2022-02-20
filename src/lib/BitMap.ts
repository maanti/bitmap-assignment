import { Pixel } from '../DistanceFinder';

type BitMapData = Array<Array<Pixel>>;

class BitMap {
  private n: number;

  private m: number;

  private readonly data: BitMapData;

  constructor(n?: number, m?: number, data?: BitMapData) {
    this.n = n || NaN;
    this.m = m || NaN;
    this.data = data || [];
  }

  public getPixel(i: number, j: number) {
    return this.data[i][j];
  }

  public setNDimension(n: number) {
    this.n = n;
  }

  public getNDimension() {
    return this.n;
  }

  public setMDimension(m: number) {
    this.m = m;
  }

  public getMDimension() {
    return this.m;
  }

  public addRow(row: number[]) {
    this.data.push(row);
  }
}

export default BitMap;
