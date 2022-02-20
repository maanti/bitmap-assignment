import { program } from 'commander';
import DistanceFinder, { BitMap } from './DistanceFinder';
import FileInput from './io/FileInput';
import StdinInput from './io/StdinInput';
import Input from './io/Input';
import StdoutOutput from './io/StdoutOutput';

program.option('-f, --file <string>');
program.parse();
const options = program.opts();

async function main() {
  let input: Input;

  if (options.file) {
    input = new FileInput(options.file);
  } else {
    input = new StdinInput();
  }

  const bitMaps: BitMap[] = await input.readInputData();
  // Find distances and print them to stdout
  bitMaps.forEach((bitMap) => {
    const distanceFinder = new DistanceFinder(bitMap);
    const distances = distanceFinder.getDistances();
    StdoutOutput.printDistances(distances);
  });
}

(async () => {
  await main();
})();
