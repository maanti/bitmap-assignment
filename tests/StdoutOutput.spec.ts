import { expect } from 'chai';
import { PassThrough } from 'stream';
import StdoutOutput from '../src/io/StdoutOutput';
import DistanceMap from '../src/lib/DistanceMap';

describe('StdoutOutput', () => {
  it('should write distances to the out stream', (done) => {
    // Arrange
    const distances = new DistanceMap([[1, 2], [3, 4]]);
    let input = '';
    const mockWriteable = new PassThrough();
    mockWriteable.on('data', (data) => {
      input += data;
    });

    // Act
    StdoutOutput.printDistanceMap(distances, mockWriteable);

    // Assert
    setImmediate(() => {
      expect(input).to.eq('\n1 2 \n3 4 \n');
      done();
    });
  });
});
