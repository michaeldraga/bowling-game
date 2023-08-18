import { BonusPointFrames, GameResult, PointFrame } from './types';

export function isStrike(frame: number[]): frame is [10] {
  return frame.length === 1 && frame[0] === 10;
}

export function isSpare(frame: number[]): frame is [number, number] {
  return frame.length === 2 && frame[0] + frame[1] === 10;
}

function calculateBonusPoints(frames: number[][]): { frame: number[]; bonusPoints: number }[] {
  const bonusFrames: BonusPointFrames[] = [];

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];

    let bonusPoints = 0;
    if (isStrike(frame)) {
      bonusPoints = calculateStrikeBonusPoints(i, frames);
    } else if (isSpare(frame)) {
      bonusPoints = frames[i + 1][0];
    }

    bonusFrames.push({ frame, bonusPoints });
  }

  return bonusFrames;
}

function calculateStrikeBonusPoints(strikeFrameIndex: number, frames: number[][]) {
  let bonusPoints = 0;

  const nextFrame = frames[strikeFrameIndex + 1];
  bonusPoints += nextFrame[0];
  if (isStrike(nextFrame)) {
    bonusPoints += frames[strikeFrameIndex + 2][0];
  } else {
    bonusPoints += nextFrame[1];
  }

  return bonusPoints;
}

function calculatePoints(bonusPointFrames: BonusPointFrames[]): PointFrame[] {
  const pointFrames: PointFrame[] = [];
  let sum = 0;

  for (const bonusFrame of bonusPointFrames) {
    sum += bonusFrame.frame.reduce((c, a) => a + c) + bonusFrame.bonusPoints;
    pointFrames.push({ ...bonusFrame, sum });
  }

  return pointFrames;
}

export function calculateGame(frames: number[][]): GameResult {
  const bonusPointFrames = calculateBonusPoints(frames);

  const pointFrames = calculatePoints(bonusPointFrames);

  const { sum } = pointFrames[pointFrames.length - 1];

  return {
    pointFrames,
    sum,
  };
}
