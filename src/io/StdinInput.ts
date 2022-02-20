import { ReadStream } from 'fs';
import Input from './Input';

class StdinInput extends Input {
  constructor({ readStream }: {readStream?: ReadStream} = {}) {
    super(readStream || process.stdin);
  }
}

export default StdinInput;
