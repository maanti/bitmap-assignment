import Readline, { Interface } from 'readline';
import { Pixel } from '../DistanceFinder';
import ReadableStream = NodeJS.ReadableStream;
import BitMap from '../lib/BitMap';

/**
 * Abstract class representing an Input
 */
abstract class Input {
  private bitMap: BitMap;

  private bitMaps: BitMap[] = [];

  private linesCount: number = 0;

  private numberOfCases: number = 0;

  private readline: Interface;

  protected constructor(inputStream: ReadableStream) {
    this.readline = Readline.createInterface({
      input: inputStream,
      output: process.stdout,
    });
    this.bitMap = new BitMap();
  }

  /**
   * Public method to read all the test cases from the Input
   * @public
   * @return Promise<BitMap[]>
   */
  public async readInputData(): Promise<BitMap[]> {
    return new Promise((resolve, reject) => {
      this.readline
        .on('line', this.handleLine.bind(this))
        .on('close', () => {
          this.finalizeBitMap();
          resolve(this.bitMaps);
        })
        .on('error', reject);
    });
  }

  /**
   * Sets number of test cases in the input
   * @param {string} line
   * @private
   */
  private setNumberOfCases(line: string): void {
    this.numberOfCases = Number(line);
  }

  /**
   * Parses numbers representing bitMap dimensions (n and m)
   * @param {string} line
   * @private
   */
  private setBitMapDimensions(line: string): void {
    const [nDimension, mDimension] = line.split(/\s+/).map(Number);
    this.bitMap.setNDimension(nDimension);
    this.bitMap.setMDimension(mDimension);
  }

  /**
   * Increments linesCount and adds a new row to a bitMap
   * @param {string} line
   * @private
   */
  private setBitMapRow(line: string): void {
    this.linesCount++;
    this.bitMap.addRow(line.split('')
      .map((pixel) => (pixel === '1' ? Pixel.White : Pixel.Black)));
  }

  /**
   * When test case ended, reset variables and push bitMap to bitMaps array
   * @private
   */
  private finalizeBitMap(): void {
    this.bitMaps.push(this.bitMap);
    this.bitMap = new BitMap();
    this.linesCount = 0;
  }

  /**
   * Closes Readline interface
   * @private
   */
  private close(): void {
    this.readline.close();
  }

  /**
   * Handles each line, deciding what data is there and what to do with it
   * @param {string} line
   * @private
   */
  private handleLine(line: string): void {
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
}

export default Input;
