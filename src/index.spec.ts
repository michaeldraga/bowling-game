import { describe, expect, it } from '@jest/globals';
import { calculateGame } from './bowlingService';

describe('index', () => {
  describe('calculateGameScore', () => {
    it('should calculate the correct score for game1', () => {
      const testGame1: number[][] = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1], [7, 3], [6, 4], [10], [2, 8, 6]];

      expect(calculateGame(testGame1).sum).toEqual(133);
    });

    it('should calculate the correct score for a part of game1', () => {
      const testGame1: number[][] = [[1, 4], [4, 5], [6, 4], [5, 5], [10], [0, 1]];

      expect(calculateGame(testGame1).sum).toEqual(61);
    });

    it('should calculate the correct score for game2', () => {
      const testGame2: number[][] = [[5, 5], [4, 5], [8, 2], [10], [0, 10], [10], [6, 2], [10], [4, 6], [10, 10]];

      expect(calculateGame(testGame2).sum).toEqual(169);
    });

    it('should calculate the correct score for game3', () => {
      const testGame3: number[][] = [[5, 5], [4, 0], [8, 1], [10], [0, 10], [10], [10], [10], [4, 6], [10, 10, 5]];

      expect(calculateGame(testGame3).sum).toEqual(186);
    });

    it('should calculate the correct score for perfect game', () => {
      const testGame4: number[][] = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]];

      expect(calculateGame(testGame4).sum).toEqual(300);
    });
  })
});
