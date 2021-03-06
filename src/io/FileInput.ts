import fs, { ReadStream } from 'fs';
import Input from './Input';

/**
 * Represents an Input that reads data from file
 */
class FileInput extends Input {
  constructor(fileName: string, { readStream }: {readStream?: ReadStream} = {}) {
    const fileStream = readStream || fs.createReadStream(fileName);
    super(fileStream);
  }
}

export default FileInput;
