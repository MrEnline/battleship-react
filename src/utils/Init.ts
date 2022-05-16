import { FIELD_SIZE, INITIAL_SHIPS } from "./Constants";
import { StateCellsProp } from "../utils/Types";
import { TypeCoord } from "../utils/Types";
import { LimitsCoord } from "../utils/Types";
import { LimitsStateShips } from "../utils/Types";

export const generateShips = () => {
    const initShips = INITIAL_SHIPS;
    let ships: string[] = [];
    let blockCellsSet = new Set<string>();
    let blockCells: string[] = [];
    for (let i = 0; i < initShips.length; i++) {
        while (initShips[i].count > 0) {
            const newScheme = generateRandomScheme(initShips[i].scheme);
            const maxPosition = {
                y: newScheme.length - 1,
                x: newScheme[0].length - 1,
            };
            while (true) {
                const startCoord = generateRandomCoord(); //генерация новой координаты для корабля
                const coordShipOnField = setShipOnField(
                    startCoord,
                    maxPosition,
                    newScheme,
                    blockCells,
                );
                if (coordShipOnField !== undefined) {
                    ships = [...ships, ...coordShipOnField];
                    const neighBorsShip = coordShipOnField.reduce(
                        (neighbors: Array<string>, coord: string) => {
                            return [
                                ...neighbors,
                                ...getNeighbors(parseCoordinates(coord)),
                            ];
                        },
                        [],
                    );
                    blockCellsSet = new Set(neighBorsShip);
                    blockCellsSet.forEach((value) => blockCells.push(value));
                    break;
                }
            }
            INITIAL_SHIPS[i].count--;
        }
    }

    return ships.reduce((accum: StateCellsProp, currValue: string) => {
        accum[currValue] = true;
        return accum;
    }, {} as StateCellsProp);
};

function setShipOnField(
    startCoord: TypeCoord,
    maxPosition: TypeCoord,
    newScheme: number[][],
    blockCells: string[],
) {
    let coordShip: string[] = [];
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
}

function isBlockCells(y: number, x: number, blockCells: string[]) {
    return (
        y > FIELD_SIZE.columns ||
        x > FIELD_SIZE.rows ||
        blockCells.includes(`${y}_${x}`)
    );
}

function generateRandomScheme(scheme: number[][]) {
    const newScheme =
        generateRandomValue(LimitsStateShips.Max, LimitsStateShips.Min) >= 5
            ? scheme
            : scheme[0].map((value, i) => scheme.map((arr) => arr[i]));
    if (newScheme.length === 1) {
        return newScheme;
    }
    if (generateRandomValue(LimitsStateShips.Max, LimitsStateShips.Min) >= 5) {
        newScheme.reverse();
    }
    if (generateRandomValue(LimitsStateShips.Max, LimitsStateShips.Min) >= 5) {
        newScheme.forEach((value) => value.reverse());
    }
    return newScheme;
}

function getNeighbors(coord: TypeCoord) {
    const x = +coord.x;
    const y = +coord.y;

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
}

// function getShipL(
//     coord: TypeCoord,
//     kx: number,
//     ky: number,
//     coordXEndElem: number = 0,
//     coordYEndElem: number = 0,
// ): string[] {
//     return [
//         `${coord.y}_${coord.x}`,
//         `${coord.y + ky * 1}_${coord.x + kx * 1}`,
//         `${coord.y + ky * 2}_${coord.x + kx * 2}`,
//         `${coordYEndElem ? coordYEndElem : coord.y + ky * 2}_${
//             coordXEndElem ? coordXEndElem : coord.x + kx * 2
//         }`,
//     ];
// }

// function getShipI(coord: TypeCoord, kx: number, ky: number): string[] {
//     return [
//         `${coord.y}_${coord.x}`,
//         `${coord.y + ky * 1}_${coord.x + kx * 1}`,
//         `${coord.y + ky * 2}_${coord.x + kx * 2}`,
//         `${coord.y + ky * 3}_${coord.x + kx * 3}`,
//     ];
// }

function generateRandomValue(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCoord(): TypeCoord {
    const y = generateRandomValue(LimitsCoord.Max, LimitsCoord.Min);
    const x = generateRandomValue(LimitsCoord.Max, LimitsCoord.Min);
    return { x, y };
}

function parseCoordinates(xy: string): TypeCoord {
    const y: number = +xy.split("_")[0];
    const x: number = +xy.split("_")[1];
    return { x, y };
}
