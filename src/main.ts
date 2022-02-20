import { OptionValues, program } from 'commander';
import DistanceFinder, { BitMap } from './DistanceFinder';
import FileInput from './io/FileInput';
import StdinInput from './io/StdinInput';
import Input from './io/Input';
import StdoutOutput from './io/StdoutOutput';

/**
 * Parses and returns command-line arguments
 */
function getCommandLineArgs(): OptionValues {
  program.option('-f, --file <string>');
  program.parse();
  return program.opts();
}

/**
 * Returns either FileInput or StdinInput depending on whether --file key was used
 * @return Input
 */
function getInput(): Input {
  const { file: fileName } = getCommandLineArgs();

  return fileName ? new FileInput(fileName) : new StdinInput();
}

async function main(): Promise<void> {
  const input = getInput();

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
