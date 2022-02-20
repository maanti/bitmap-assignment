import readline, { Interface } from 'readline';
import { Pixel } from '../DistanceFinder';
import ReadableStream = NodeJS.ReadableStream;
import BitMap from '../lib/BitMap';

class Input {
  private bitMap: BitMap;

  private bitMaps: BitMap[] = [];

  private linesCount = 0;

  private numberOfCases: number = NaN;

  private rl: Interface;

  constructor(inputStream: ReadableStream) {
    this.rl = readline.createInterface({
      input: inputStream,
      output: process.stdout,
    });
    this.bitMap = new BitMap();
  }

  private setNumberOfCases(line: string) {
    this.numberOfCases = Number(line);
  }

  private setBitMapDimensions(line: string) {
    const [n, m] = line.split(/\s+/).map(Number);
    this.bitMap.setNDimension(n);
    this.bitMap.setMDimension(m);
  }

  private setBitMapRow(line: string) {
    // Collect lines and build bitMap
    this.linesCount++;
    this.bitMap.addRow(line.split('')
      .map((pixel) => (pixel === '1' ? Pixel.White : Pixel.Black)));
  }

  private finalizeBitMap() {
    // Test case ended, reset variables and push bitMap to bitMaps
    this.bitMaps.push(this.bitMap);
    this.bitMap = new BitMap();
    this.linesCount = 0;
  }

  private close() {
    this.rl.close();
  }

  private handleLine(line: string) {
    const lineTrimmed = line.trim();
    if (!this.numberOfCases) {
      this.setNumberOfCases(lineTrimmed);
    } else if (!this.bitMap.getNDimension() && !this.bitMap.getMDimension()) {
      this.setBitMapDimensions(lineTrimmed);
    } else if (line === '') {
      this.close();
    } else if (this.linesCount < this.bitMap.getNDimension()) {
      this.setBitMapRow(line);
    } else {
      this.finalizeBitMap();
      this.setBitMapDimensions(line);
    }
  }

  public async readInputData(): Promise<BitMap[]> {
    return new Promise((resolve, reject) => {
      this.rl
        .on('line', this.handleLine.bind(this))
        .on('close', () => {
          this.finalizeBitMap();
          resolve(this.bitMaps);
        })
        .on('error', reject);
    });
  }
}

export default Input;
