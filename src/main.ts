import readline from 'readline';
import fs from 'fs';
import { program } from 'commander';
import DistanceFinder, { BitMap, Distances, Pixel } from './distance-finder';

program.option('-f, --file <string>');
program.parse();
const options = program.opts();

let fileStream = null;

if (options.file) {
  fileStream = fs.createReadStream(options.file);
}

const rl = readline.createInterface({
  input: fileStream || process.stdin,
  output: process.stdout,
});

function printDistances(distances: Distances): void {
  process.stdout.write('\n');
  for (let i = 0; i < distances.length; i++) {
    for (let j = 0; j < distances[0].length; j++) {
      process.stdout.write(`${distances[i][j]} `);
    }
    process.stdout.write('\n');
  }
}

function main() {
  let numberOfCases: number = NaN;

  let bitMapN: number = NaN;
  let bitMapM: number = NaN;

  let bitMap: BitMap = [];
  const bitMaps: BitMap[] = [];

  let linesCount = 0;

  const handleLine = (line: string) => {
    const lineTrimmed = line.trim();
    if (!numberOfCases) {
      numberOfCases = Number(lineTrimmed);
    } else if (!bitMapN && !bitMapM) {
      [bitMapN, bitMapM] = lineTrimmed.split(/\s+/).map(Number);
    } else if (line === '') {
      // To be able to end console input by typing Enter
      rl.close();
    } else if (linesCount < bitMapN) {
      // Collect lines and build bitMap
      linesCount++;
      bitMap.push(lineTrimmed.split('').map((el) => (el === '1' ? Pixel.White : Pixel.Black)));
    } else {
      // Test case ended, reset variables and push bitMap to bitMaps
      bitMaps.push(bitMap);
      bitMap = [];
      linesCount = 0;
      [bitMapN, bitMapM] = lineTrimmed.split(/\s+/).map(Number);
    }
  };

  rl
    .on('line', handleLine)
    .on('close', () => {
      // Push the latest bitMap
      bitMaps.push(bitMap);

      // Find distances and print them to stdout
      bitMaps.forEach((bm) => {
        const distanceFinder = new DistanceFinder(bm);
        const distances = distanceFinder.getDistances();
        printDistances(distances);
      });
      process.exit(0);
    });
}

main();
