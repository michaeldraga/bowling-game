import { Frame, FrameResult } from './types';

export function isStrike(frame: Frame): boolean {
  return frame.roll1 === 10 && frame.roll2 === 0;
}

export function isSpare(frame: Frame): boolean {
  return frame.roll2 !== undefined && frame.roll1 + frame.roll2 === 10;
}

export function isDefaultFrame(frame: Frame): boolean {
  return frame.roll2 !== undefined;
}

export function calculateFrameResult(frame: Frame): FrameResult {
  if (isStrike(frame)) {
    return {
      ...frame,
      type: 'strike',
    };
  }

  if (isDefaultFrame(frame)) {
    if (isSpare(frame)) {
      return {
        ...frame,
        type: 'spare',
      };
    }

    const sum = frame.roll1 + frame.roll2 || 0;

    if (sum < 10 && sum >= 0) {
      return {
        ...frame,
        type: 'default',
      };
    }
  }

  throw new Error(`Invalid frame given: roll1: ${frame.roll1}, roll2: ${frame.roll2}`);
}

function calculateGameScore(frameResults: FrameResult[]): number {
  const bonusFrames: (Frame & { bonusPoints: number })[] = [];

  const offset =
    1 +
    (frameResults[frameResults.length - 1].roll1 === 0 && frameResults[frameResults.length - 1].roll1 === 0 ? 1 : 0);

  for (let i = 0; i < frameResults.length - offset; i++) {
    const frameResult = frameResults[i];

    let bonusPoints = 0;
    if (frameResult?.type === 'strike') {
      const nextFrame = frameResults[i + 1];
      bonusPoints += nextFrame.roll1;

      if (nextFrame.type === 'strike') {
        bonusPoints += i + 2 < frameResults.length ? frameResults[i + 2].roll1 : 0;
      } else {
        bonusPoints += nextFrame.roll2;
      }
    } else if (frameResult?.type === 'spare') {
      bonusPoints += frameResults[i + 1].roll1;
    }

    bonusFrames.push({ ...frameResult, bonusPoints });
  }

  const pointFrames = [];
  let sum = 0;

  for (const bonusFrame of bonusFrames) {
    sum += bonusFrame.roll1 + bonusFrame.roll2 + bonusFrame.bonusPoints;
    pointFrames.push({ ...bonusFrame, sum });
  }

  console.log(pointFrames);
  return sum;
}

const testGame: Frame[] = [
  { roll1: 1, roll2: 4 },
  { roll1: 4, roll2: 5 },
  { roll1: 6, roll2: 4 },
  { roll1: 5, roll2: 5 },
  { roll1: 10, roll2: 0 },
  { roll1: 0, roll2: 1 },
  { roll1: 7, roll2: 3 },
  { roll1: 6, roll2: 4 },
  { roll1: 10, roll2: 0 },
  { roll1: 2, roll2: 8 },
  { roll1: 6, roll2: 0 },
  { roll1: 0, roll2: 0 },
];

const testGame2: Frame[] = [
  { roll1: 5, roll2: 5 },
  { roll1: 4, roll2: 5 },
  { roll1: 8, roll2: 2 },
  { roll1: 10, roll2: 0 },
  { roll1: 0, roll2: 10 },
  { roll1: 10, roll2: 0 },
  { roll1: 6, roll2: 2 },
  { roll1: 10, roll2: 0 },
  { roll1: 4, roll2: 6 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 0, roll2: 0 },
];

const testGame3: Frame[] = [
  { roll1: 5, roll2: 5 },
  { roll1: 4, roll2: 0 },
  { roll1: 8, roll2: 1 },
  { roll1: 10, roll2: 0 },
  { roll1: 0, roll2: 10 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 4, roll2: 6 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 5, roll2: 0 },
];

const testGame4: Frame[] = [
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
  { roll1: 10, roll2: 0 },
];

for (const frame of testGame) {
  console.log(calculateFrameResult(frame));
}

console.log(calculateGameScore(testGame.map(calculateFrameResult)));
console.log(calculateGameScore(testGame2.map(calculateFrameResult)));
console.log(calculateGameScore(testGame3.map(calculateFrameResult)));
console.log(calculateGameScore(testGame4.map(calculateFrameResult)));
