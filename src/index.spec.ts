import { describe, expect, it } from '@jest/globals';
import { Frame } from './types';
import { isStrike } from './index';

describe('index', () => {
  describe('isStrike', () => {
    it('should return true when first roll had 10 pins with no second roll present', () => {
      const frame: Frame = { roll1: 10 };

      expect(isStrike(frame)).toBeTruthy();
    });

    it('should return false when first roll had less than 10 pins', () => {
      const frame: Frame = { roll1: 1, roll2: 5 };

      expect(isStrike(frame)).toBeFalsy();
    });

    it('should throw an exception when first roll is less than 10 and no second roll is present', () => {
      const frame: Frame = { roll1: 9 };

      expect(isStrike(frame)).toThrowError();
    });
  });
});
