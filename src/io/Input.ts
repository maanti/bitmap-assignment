import readline, { Interface } from 'readline';
import { BitMap, Pixel } from '../DistanceFinder';
import ReadableStream = NodeJS.ReadableStream;

class Input {
  private numberOfCases: number = NaN;

  private bitMapN: number = NaN;

  private bitMapM: number = NaN;

  private bitMaps: BitMap[] = [];

  private bitMap: BitMap = [];

  private linesCount = 0;

  private rl: Interface;

  constructor(inputStream: ReadableStream) {
    this.rl = readline.createInterface({
      input: inputStream,
      output: process.stdout,
    });
  }

  private setNumberOfCases(line: string) {
    this.numberOfCases = Number(line);
  }

  private setBitMapDimensions(line: string) {
    [this.bitMapN, this.bitMapM] = line.split(/\s+/).map(Number);
  }

  private setBitMapRow(line: string) {
    // Collect lines and build bitMap
    this.linesCount++;
    this.bitMap.push(line.split('')
      .map((pixel) => (pixel === '1' ? Pixel.White : Pixel.Black)));
  }

  private finalizeBitMap() {
    // Test case ended, reset variables and push bitMap to bitMaps
    this.bitMaps.push(this.bitMap);
    this.bitMap = [];
    this.linesCount = 0;
  }

  private close() {
    this.rl.close();
  }

  private handleLine(line: string) {
    const lineTrimmed = line.trim();
    if (!this.numberOfCases) {
      this.setNumberOfCases(lineTrimmed);
    } else if (!this.bitMapN && !this.bitMapM) {
      this.setBitMapDimensions(lineTrimmed);
    } else if (line === '') {
      // To be able to end console input by typing Enter
      this.close();
    } else if (this.linesCount < this.bitMapN) {
      this.setBitMapRow(line);
    } else {
      this.finalizeBitMap();
      this.setBitMapDimensions(line);
    }
  }

  public readInputData(): Promise<BitMap[]> {
    return new Promise((resolve, reject) => {
      this.rl
        .on('line', this.handleLine)
        .on('close', () => {
          // Push the latest bitMap
          this.finalizeBitMap();
          resolve(this.bitMaps);
        })
        .on('error', reject);
    });
  }
}

export default Input;
