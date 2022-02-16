import { expect } from 'chai';
import PointsQueue from '../src/points-queue';

describe('PointsQueue', () => {
  it('should return elements added by push in FIFO order', () => {
    // Arrange
    const pointsQueue = new PointsQueue();
    const firstPoint = { x: 0, y: 0 };
    const secondPoint = { x: 1, y: 1 };
    pointsQueue.push(firstPoint);
    pointsQueue.push(secondPoint);

    // Act & Assert
    expect(pointsQueue.shift()).to.deep.equal(firstPoint);
    expect(pointsQueue.shift()).to.deep.equal(secondPoint);
  });

  it('should return size of the queue', () => {
    // Arrange
    const pointsQueue = new PointsQueue();
    const firstPoint = { x: 0, y: 0 };
    const secondPoint = { x: 1, y: 1 };
    pointsQueue.push(firstPoint);
    pointsQueue.push(secondPoint);

    // Act & Assert
    expect(pointsQueue.size()).to.equal(2);
  });
});
