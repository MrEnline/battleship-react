import { StateCellsProp, TypeCoord } from "../utils/Types";
import { generateRandomCoord } from "./Functions";

export const runNextStep = (
    stateCells: StateCellsProp,
    coordShips: StateCellsProp,
) => {
    const newStateCells = { ...stateCells };
    let coord: TypeCoord;
    do {
        coord = generateRandomCoord();
    } while (`${coord.y}_${coord.x}` in newStateCells);
    newStateCells[`${coord.y}_${coord.x}`] = coordShips[`${coord.y}_${coord.x}`]
        ? true
        : false;
    return newStateCells;
};
