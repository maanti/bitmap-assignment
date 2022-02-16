import { expect } from 'chai';
import DistanceFinder from '../src/distance-finder';

describe('should return expected result', () => {
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
    const n = input.length;
    const m = input[0].length;
    it(`for matrix ${n}x${m} ${JSON.stringify(input)} result should be equal to ${JSON.stringify(expectedResult)}`, () => {
      // Act
      const distanceFinder = new DistanceFinder(input);

      // Assert
      expect(distanceFinder.getDistances()).to.deep.equal(expectedResult);
    });
  });
});
