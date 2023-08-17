import { describe, expect, it } from '@jest/globals';

describe('index', () => {
    describe('add', () => {
        it('should add 2 numbers', () => {
            expect(1 + 2).toEqual(3);
        });
    });
});
