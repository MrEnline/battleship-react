import { TypeCoord } from "../utils/Types";
import { LimitsCoord } from "../utils/Types";

export function generateRandomCoord(): TypeCoord {
    const y: number = generateRandomValue(LimitsCoord.Max, LimitsCoord.Min);
    const x: number = generateRandomValue(LimitsCoord.Max, LimitsCoord.Min);
    return { x, y };
}

export function generateRandomValue(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
