import { FIELD_SIZE, MAX_COUNT_ONE_SHIP } from "./Constants";
import { StateCellsProp } from "../utils/Types";
import { TypeCoord } from "../utils/Types";
import { LimitsCoord } from "../utils/Types";
import { DirectionGeneration } from "../utils/Types";
import { LimitsDirections } from "../utils/Types";

export const generateShips = () => {
    let coordHeadCell = generateRandomCoord();
    let directShip = generateRandomValue(
        LimitsDirections.Max,
        LimitsDirections.Min,
    );
    let shipL: string[] = [];
    let coordXEndElem: number = 1;
    let coordYEndElem: number = 1;
    switch (directShip) {
        case DirectionGeneration.Horiz:
            coordHeadCell.x =
                coordHeadCell.x + 2 <= FIELD_SIZE.rows
                    ? coordHeadCell.x
                    : coordHeadCell.x - 2;
            if (coordHeadCell.y - 1 === 0) {
                coordYEndElem = coordHeadCell.y + 1;
            }
            if (coordHeadCell.y - 1 > 0) {
                coordYEndElem = coordHeadCell.y - 1;
            }
            shipL = getShipL(coordHeadCell, 1, 0, 0, coordYEndElem);
            break;
        case DirectionGeneration.Vertic:
            coordHeadCell.y =
                coordHeadCell.y + 2 <= FIELD_SIZE.columns
                    ? coordHeadCell.y
                    : coordHeadCell.y - 2;
            coordXEndElem =
                coordHeadCell.x + 1 <= FIELD_SIZE.rows
                    ? coordHeadCell.x + 1
                    : coordHeadCell.x - 1;
            shipL = getShipL(coordHeadCell, 0, 1, coordXEndElem, 0);
            break;
    }
    const neighBorsShipL: Array<string> = shipL.reduce(
        (neighbors: Array<string>, coord: string) => {
            return [...neighbors, ...getNeighbors(parseCoordinates(coord))];
        },
        [],
    );

    let blockCellsSet = new Set(neighBorsShipL);
    let blockCells: string[] = [];

    blockCellsSet.forEach((value) => {
        blockCells.push(value);
    });

    let shipI: string[] = [];
    coordHeadCell = generateRandomCoord();

    let isGenerateCoordShipI: boolean = true;
    while (isGenerateCoordShipI) {
        directShip = generateRandomValue(
            LimitsDirections.Max,
            LimitsDirections.Min,
        );
        coordHeadCell = generateRandomCoord();
        coordHeadCell.x =
            coordHeadCell.x + 3 <= FIELD_SIZE.rows
                ? coordHeadCell.x
                : coordHeadCell.x - 3;
        coordHeadCell.y =
            coordHeadCell.y + 3 <= FIELD_SIZE.columns
                ? coordHeadCell.y
                : coordHeadCell.y - 3;
        switch (directShip) {
            case DirectionGeneration.Horiz:
                coordHeadCell.x =
                    coordHeadCell.x + 3 <= FIELD_SIZE.rows
                        ? coordHeadCell.x
                        : coordHeadCell.x - 3;
                shipI = getShipI(coordHeadCell, 1, 0);
                break;
            case DirectionGeneration.Vertic:
                coordHeadCell.y =
                    coordHeadCell.y + 3 <= FIELD_SIZE.columns
                        ? coordHeadCell.y
                        : coordHeadCell.y - 3;
                shipI = getShipI(coordHeadCell, 0, 1);
                break;
        }
        isGenerateCoordShipI = false;
        for (let item of blockCells) {
            if (shipI.includes(item)) {
                isGenerateCoordShipI = true;
                break;
            }
        }
    }

    const neighBorsShipI = shipI.reduce(
        (neighbors: Array<string>, coord: string) => {
            return [...neighbors, ...getNeighbors(parseCoordinates(coord))];
        },
        [],
    );

    blockCellsSet = new Set(neighBorsShipI);
    neighBorsShipI.forEach((value) => {
        blockCellsSet.add(value);
    });
    blockCellsSet.forEach((value) => {
        blockCells.push(value);
    });

    let countShipOne = 0;
    let shipsOne: string[] = [];
    while (countShipOne < MAX_COUNT_ONE_SHIP) {
        coordHeadCell = generateRandomCoord();
        if (!blockCells.includes(`${coordHeadCell.y}_${coordHeadCell.x}`)) {
            blockCells.push(`${coordHeadCell.y}_${coordHeadCell.x}`);
            shipsOne.push(`${coordHeadCell.y}_${coordHeadCell.x}`);
            countShipOne++;
            if (countShipOne < MAX_COUNT_ONE_SHIP) {
                blockCells = [...blockCells, ...getNeighbors(coordHeadCell)];
            }
        }
    }

    return [...shipL, ...shipI, ...shipsOne].reduce(
        (accum: StateCellsProp, currValue: string) => {
            accum[currValue] = true;
            return accum;
        },
        {} as StateCellsProp,
    );
};

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

function getShipL(
    coord: TypeCoord,
    kx: number,
    ky: number,
    coordXEndElem: number = 0,
    coordYEndElem: number = 0,
): string[] {
    return [
        `${coord.y}_${coord.x}`,
        `${coord.y + ky * 1}_${coord.x + kx * 1}`,
        `${coord.y + ky * 2}_${coord.x + kx * 2}`,
        `${coordYEndElem ? coordYEndElem : coord.y + ky * 2}_${
            coordXEndElem ? coordXEndElem : coord.x + kx * 2
        }`,
    ];
}

function getShipI(coord: TypeCoord, kx: number, ky: number): string[] {
    return [
        `${coord.y}_${coord.x}`,
        `${coord.y + ky * 1}_${coord.x + kx * 1}`,
        `${coord.y + ky * 2}_${coord.x + kx * 2}`,
        `${coord.y + ky * 3}_${coord.x + kx * 3}`,
    ];
}

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
