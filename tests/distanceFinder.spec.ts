import { expect } from 'chai';
import DistanceFinder from '../src/distance-finder';

describe('Main', () => {
  it('should solve provided example', () => {
    // Arrange
    const input = [
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 1, 1, 0],
    ];
    const expectedResult = [
      [3, 2, 1, 0],
      [2, 1, 0, 0],
      [1, 0, 0, 1],
    ];

    // Act
    const distanceFinder = new DistanceFinder(input);

    // Assert
    expect(distanceFinder.getDistances()).to.deep.equal(expectedResult);
  });
});
