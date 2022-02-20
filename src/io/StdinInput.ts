import Input from './Input';

class StdinInput extends Input {
  constructor() {
    super(process.stdin);
  }
}

export default StdinInput;
