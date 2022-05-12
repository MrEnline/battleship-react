import { FIELD_SIZE } from "./Constants";
import { StateCellsProp } from "../utils/Types";
import { TypeCoord } from "../utils/Types";
import { LimitsCoord } from "../utils/Types";

function generateRandomCoord(): TypeCoord {
    const y: number = generateRandomValue(LimitsCoord.Max, LimitsCoord.Min);
    const x: number = generateRandomValue(LimitsCoord.Max, LimitsCoord.Min);
    return { x, y };
}

function generateRandomValue(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const runNextStep = (
    stateCells: StateCellsProp,
    coordShips: StateCellsProp,
) => {
    let newStateCells: StateCellsProp = { ...stateCells };
    let coord = generateRandomCoord();
    while (newStateCells[`${coord.y}_${coord.x}`] !== undefined) {
        coord = generateRandomCoord();
    }
    newStateCells[`${coord.y}_${coord.x}`] =
        coordShips[`${coord.y}_${coord.x}`] !== undefined ? true : false;

    return newStateCells;
};
