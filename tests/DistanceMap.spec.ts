import { expect } from 'chai';
import DistanceMap from '../src/lib/DistanceMap';
import BitMap from '../src/lib/BitMap';

describe('DistanceMap', () => {
  it('.getNDimensions() should return N dimension', () => {
    // Arrange
    const distances = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const distanceMap = new DistanceMap(distances);

    // Act & Assert
    expect(distanceMap.getNDimension()).to.equal(3);
  });

  it('.getMDimensions() should return N dimension', () => {
    // Arrange
    const distances = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const distanceMap = new DistanceMap(distances);

    // Act & Assert
    expect(distanceMap.getMDimension()).to.equal(2);
  });

  it('.setDistance() should set a value to specified position', () => {
    // Arrange
    const distances = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const distanceMap = new DistanceMap(distances);

    // Act
    distanceMap.setDistance(1, 1, 100);

    // Assert
    expect(distanceMap.getDistance(1, 1)).to.equal(100);
  });

  it('.initialize() should set to 0 distances for white pixels', () => {
    // Arrange
    const distanceMap = DistanceMap.createInstance(3, 3, { fillWith: NaN });

    // Act
    distanceMap.initialize(new BitMap(3, 3, [[0, 0, 1], [0, 1, 0], [0, 0, 0]]));

    // Assert
    expect(distanceMap.getDistance(0, 2)).to.equal(0);
    expect(distanceMap.getDistance(1, 1)).to.equal(0);
  });
});
