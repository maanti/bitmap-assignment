import { expect } from 'chai';
import BitMap from '../src/lib/BitMap';

describe('BitMap', () => {
  describe('should add a row to bitMap and get pixels from it', () => {
    it('should add a row to bitMap and get pixels from it - one row', () => {
      // Arrange
      const bitMap = new BitMap();
      const row = [1, 2, 3];

      // Act
      bitMap.addRow(row);

      // Assert
      expect(bitMap.getPixel(0, 0)).to.equal(row[0]);
      expect(bitMap.getPixel(0, 1)).to.equal(row[1]);
      expect(bitMap.getPixel(0, 2)).to.equal(row[2]);
    });

    it('should add a row to bitMap and get pixels from it - several rows', () => {
      // Arrange
      const bitMap = new BitMap();
      const row1 = [1, 2];
      const row2 = [3, 4];

      // Act
      bitMap.addRow(row1);
      bitMap.addRow(row2);

      // Assert
      expect(bitMap.getPixel(0, 0)).to.equal(row1[0]);
      expect(bitMap.getPixel(0, 1)).to.equal(row1[1]);
      expect(bitMap.getPixel(1, 0)).to.equal(row2[0]);
      expect(bitMap.getPixel(1, 1)).to.equal(row2[1]);
    });
  });

  it('should set and get N dimension', () => {
    // Arrange
    const bitMap = new BitMap();
    const dimension = 2311;

    // Act
    bitMap.setNDimension(dimension);

    // Assert
    expect(bitMap.getNDimension()).to.equal(dimension);
  });

  it('should set and get M dimension', () => {
    // Arrange
    const bitMap = new BitMap();
    const dimension = 2311;

    // Act
    bitMap.setMDimension(dimension);

    // Assert
    expect(bitMap.getMDimension()).to.equal(dimension);
  });
});
