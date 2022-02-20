import { program } from 'commander';
import DistanceFinder, { BitMap } from './DistanceFinder';
import FileInput from './io/FileInput';
import StdinInput from './io/StdinInput';
import Input from './io/Input';
import StdoutOutput from './io/StdoutOutput';

function getCommandLineArgs() {
  program.option('-f, --file <string>');
  program.parse();
  return program.opts();
}

async function main() {
  const options = getCommandLineArgs();

  const input: Input = options.file ? new FileInput(options.file) : new StdinInput();

  const bitMaps: BitMap[] = await input.readInputData();

  for (const bitMap of bitMaps) {
    const distanceFinder = new DistanceFinder(bitMap);
    const distances = distanceFinder.getDistances();
    StdoutOutput.printDistances(distances);
  }
}

(async () => {
  await main();
})();
