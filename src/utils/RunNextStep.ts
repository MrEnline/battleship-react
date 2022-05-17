import { StateCellsProp } from "../utils/Types";
import { generateRandomCoord } from "./Functions";

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
