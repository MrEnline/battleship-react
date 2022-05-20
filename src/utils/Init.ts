import { FIELD_SIZE, INITIAL_SHIPS } from "./Constants";
import { StateCellsProp } from "../utils/Types";
import { TypeCoord } from "../utils/Types";
import { generateRandomCoord, generateRandomBool } from "./Functions";

export const generateShips = () => {
    let ships: string[] = [];
    const blockCells: StateCellsProp = {};
    for (let i = 0; i < INITIAL_SHIPS.length; i++) {
        let count = INITIAL_SHIPS[i].count;
        while (count > 0) {
            const newScheme = generateRandomScheme(INITIAL_SHIPS[i].scheme);
            const maxPosition = {
                y: newScheme.length - 1,
                x: newScheme[0].length - 1,
            };
            for (;;) {
                const startCoord = generateRandomCoord();
                const coordShipOnField = getCoordShipOnField(
                    startCoord,
                    maxPosition,
                    newScheme,
                    blockCells,
                );
                if (coordShipOnField) {
                    ships = [...ships, ...coordShipOnField];
                    const neighBorsShip = coordShipOnField.reduce(
                        (neighbors: string[], coord: string) => {
                            return [
                                ...neighbors,
                                ...getNeighbors(parseCoordinates(coord)),
                            ];
                        },
                        [],
                    );
                    const blockCellsSet = new Set(neighBorsShip);
                    blockCellsSet.forEach(
                        (value) => (blockCells[value] = true),
                    );
                    break;
                }
            }
            count--;
        }
    }
    return ships.reduce((accum: StateCellsProp, currValue: string) => {
        accum[currValue] = true;
        return accum;
    }, {} as StateCellsProp);
};

const getCoordShipOnField = (
    startCoord: TypeCoord,
    maxPosition: TypeCoord,
    newScheme: number[][],
    blockCells: StateCellsProp,
) => {
    const coordShip: string[] = [];
    for (let y = 0; y <= maxPosition.y; y++) {
        for (let x = 0; x <= maxPosition.x; x++) {
            if (!newScheme[y][x]) {
                continue;
            }
            if (isBlockCells(startCoord.y + y, startCoord.x + x, blockCells)) {
                return;
            }
            coordShip.push(`${startCoord.y + y}_${startCoord.x + x}`);
        }
    }
    return coordShip;
};

const isBlockCells = (y: number, x: number, blockCells: StateCellsProp) => {
    return (
        y > FIELD_SIZE.columns || x > FIELD_SIZE.rows || blockCells[`${y}_${x}`]
    );
};

const generateRandomScheme = (scheme: number[][]) => {
    const newScheme = generateRandomBool()
        ? scheme
        : scheme[0].map((col, i) => scheme.map((row) => row[i]));
    if (newScheme.length === 1) {
        return newScheme;
    }
    if (generateRandomBool()) {
        newScheme.reverse();
    }
    if (generateRandomBool()) {
        newScheme.forEach((value) => value.reverse());
    }
    return newScheme;
};

const getNeighbors = (coord: TypeCoord) => {
    const { x, y } = coord;

    const topCoord = y === 1 ? -1 : y - 1;
    const bottomCoord = y === FIELD_SIZE.columns ? -1 : y + 1;
    const rightCoord = x === FIELD_SIZE.rows ? -1 : x + 1;
    const leftCoord = x === 1 ? -1 : x - 1;

    return [
        `${y}_${x}`,
        `${y}_${rightCoord}`,
        `${bottomCoord}_${rightCoord}`,
        `${bottomCoord}_${x}`,
        `${bottomCoord}_${leftCoord}`,
        `${y}_${leftCoord}`,
        `${topCoord}_${leftCoord}`,
        `${topCoord}_${x}`,
        `${topCoord}_${rightCoord}`,
    ].filter((value) => value.indexOf("-1") === -1);
};

const parseCoordinates = (xy: string) => {
    const y: number = +xy.split("_")[0];
    const x: number = +xy.split("_")[1];
    return { x, y };
};
