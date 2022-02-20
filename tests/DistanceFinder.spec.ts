import { expect } from 'chai';
import DistanceFinder from '../src/DistanceFinder';
import BitMap from '../src/lib/BitMap';
import DistanceMap from '../src/lib/DistanceMap';

describe('DistanceFinder', () => {
  [
    {
      input: [
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
      ],
      expectedResult: [
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 1],
      ],
    },
    {
      input: [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      expectedResult: [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
      ],
    },
    {
      input: [
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
      ],
      expectedResult: [
        [4, 3, 2, 1, 0],
        [3, 2, 1, 2, 1],
        [2, 1, 0, 1, 2],
        [1, 2, 1, 2, 3],
        [0, 1, 2, 3, 4],
      ],
    },
    {
      input: [
        [1, 1, 1],
        [1, 1, 1],
      ],
      expectedResult: [
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      input: [
        [1],
      ],
      expectedResult: [
        [0],
      ],
    },
  ].forEach(({ input, expectedResult }) => {
    const nDimension = input.length;
    const mDimension = input[0].length;
    it(`for matrix ${nDimension}x${mDimension} ${JSON.stringify(input)} result should be equal to ${JSON.stringify(expectedResult)}`, () => {
      // Arrange
      const bitMap = new BitMap(nDimension, mDimension, input);

      // Act
      const distanceFinder = new DistanceFinder(bitMap);

      // Assert
      expect(distanceFinder.getDistances()).to.deep.equal(new DistanceMap(expectedResult));
    });
  });
});
