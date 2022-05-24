import { LimitsCoord } from "./Types";

const generateRandomValue = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomCoord = () => {
    const y: number = generateRandomValue(LimitsCoord.MaxY, LimitsCoord.Min);
    const x: number = generateRandomValue(LimitsCoord.MaxX, LimitsCoord.Min);
    return { x, y };
};

export const generateRandomBool = () => {
    return Boolean(Math.round(Math.random()));
};
