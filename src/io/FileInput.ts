import fs from 'fs';
import Input from './Input';

class FileInput extends Input {
  constructor(fileName: string) {
    const fileStream = fs.createReadStream(fileName);
    super(fileStream);
  }
}

export default FileInput;
