export type Frame = {
  roll1: number;
  roll2: number;
};

export type BonusFrame = {
  type: BonusFrameType;
  rolls: number;
};

export type FrameResultType = 'default' | 'spare' | 'strike';

export type BonusFrameType = 'spare' | 'strike';

export type BonusPointFrames = { frame: number[]; bonusPoints: number };

export type GameResult = { sum: number; pointFrames: PointFrame[] };

export type PointFrame = BonusPointFrames & { sum: number };

