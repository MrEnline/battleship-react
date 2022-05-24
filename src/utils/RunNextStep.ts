import { StateCellsProp, TypeCoord } from "./Types";
import { generateRandomCoord } from "./Functions";

const runNextStep = (
    stateCells: StateCellsProp,
    coordShips: StateCellsProp,
) => {
    const newStateCells = { ...stateCells };
    let coord: TypeCoord;
    do {
        coord = generateRandomCoord();
    } while (`${coord.y}_${coord.x}` in newStateCells);
    newStateCells[`${coord.y}_${coord.x}`] =
        !!coordShips[`${coord.y}_${coord.x}`];
    return newStateCells;
};

export default runNextStep;
