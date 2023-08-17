export function isStrike(frame) {
    return frame.roll1 === 10;
}
export function isSpare(frame) {
    return frame.roll2 !== undefined && frame.roll1 + frame.roll2 === 10;
}
export function isDefaultFrame(frame) {
    return frame.roll2 !== undefined;
}
export function calculateFrameResult(frame) {
    if (isStrike(frame)) {
        return {
            pins: 10,
            type: 'strike',
        };
    }
    else if (isDefaultFrame(frame)) {
        frame.roll1;
    }
    if (isDefaultFrame(frame)) {
        frame;
        if (isSpare(frame)) {
            return {
                pins: 10,
                type: 'spare',
            };
        }
        const sum = frame.roll1 + (frame.roll2 || 0);
        if (sum < 10 && sum >= 0) {
            return {
                pins: sum,
                type: 'default',
            };
        }
    }
    throw new Error(`Invalid frame given: roll1: ${frame.roll1}, roll2: ${frame.roll2}`);
}
//# sourceMappingURL=index.js.map