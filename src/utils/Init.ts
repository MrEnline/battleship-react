import { FIELD_SIZE } from "./Constants";

enum LimitsCoord {
    Max = FIELD_SIZE.columns,
    Min = 1,
}

enum LimitsDirect {
    Max = 4,
    Min = 1,
}

enum DirectionGeneration {
    right = 1,
    bottom,
    left,
    top,
}

export const generateShips = () => {
    let coordHeadCell = generateRandomCoord();
    let directShip: number =
        Math.floor(Math.random() * (LimitsDirect.Max - LimitsDirect.Min + 1)) +
        LimitsDirect.Min;
    let shipL: Array<string>;
    let coordXEndElem: number;
    let coordYEndElem: number;
    switch (directShip) {
        case DirectionGeneration.right:
            coordHeadCell.x =
                coordHeadCell.x + 2 <= FIELD_SIZE.rows
                    ? coordHeadCell.x
                    : coordHeadCell.x - 2;
            coordYEndElem =
                coordHeadCell.y + 1 <= FIELD_SIZE.columns
                    ? coordHeadCell.y + 1
                    : coordHeadCell.y - 1;
            shipL = getShipL(coordHeadCell, 1, 0, 0, coordYEndElem);
            break;
        case DirectionGeneration.bottom:
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
        case DirectionGeneration.left:
            coordHeadCell.x =
                coordHeadCell.x - 2 >= 1
                    ? coordHeadCell.x
                    : coordHeadCell.x + 2;
            coordYEndElem =
                coordHeadCell.y - 1 >= 1
                    ? coordHeadCell.y - 1
                    : coordHeadCell.y + 1;
            shipL = getShipL(coordHeadCell, -1, 0, 0, coordYEndElem);
            break;
        case DirectionGeneration.top:
            coordHeadCell.y =
                coordHeadCell.y - 2 >= 1
                    ? coordHeadCell.y
                    : coordHeadCell.y - 2;
            coordXEndElem =
                coordHeadCell.x - 1 >= 1
                    ? coordHeadCell.x - 1
                    : coordHeadCell.x + 1;
            shipL = getShipL(coordHeadCell, 0, -1, coordXEndElem, 0);
            break;
        default:
            shipL = [];
    }
    const neighBorsShipL: Array<string> = shipL.reduce(
        (neighbors: Array<string>, coord: string) => {
            return [...neighbors, ...getNeighbors(parseCoordinates(coord))];
        },
        [],
    );
    let banCells = neighBorsShipL.filter((value, index) => {
        return neighBorsShipL.indexOf(value) === index;
    });

    let shipI: Array<string> = [];
    directShip =
        Math.floor(Math.random() * (LimitsDirect.Max - LimitsDirect.Min + 1)) +
        LimitsDirect.Min;

    coordHeadCell = generateRandomCoord();
    while (banCells.indexOf(`${coordHeadCell.y}_${coordHeadCell.x}`) !== -1) {
        coordHeadCell = generateRandomCoord();
    }

    switch (directShip) {
        case DirectionGeneration.right:
            coordHeadCell.x =
                coordHeadCell.x + 3 <= FIELD_SIZE.rows
                    ? coordHeadCell.x
                    : coordHeadCell.x - 3;
            shipI = getShipI(coordHeadCell, 1, 0);
            break;
        case DirectionGeneration.bottom:
            coordHeadCell.y =
                coordHeadCell.y + 3 <= FIELD_SIZE.columns
                    ? coordHeadCell.y
                    : coordHeadCell.y - 3;
            shipI = getShipI(coordHeadCell, 0, 1);
            break;
        case DirectionGeneration.left:
            coordHeadCell.x =
                coordHeadCell.x - 3 >= 1
                    ? coordHeadCell.x
                    : coordHeadCell.x + 3;
            shipI = getShipI(coordHeadCell, -1, 0);
            break;
        case DirectionGeneration.top:
            coordHeadCell.y =
                coordHeadCell.y - 3 >= 1
                    ? coordHeadCell.y
                    : coordHeadCell.y - 3;
            shipI = getShipI(coordHeadCell, 0, -1);
            break;
    }

    console.log("shipL: " + shipL);
    console.log("shipI: " + shipI);
    return [shipL, shipI, ["7_1"], ["9_5"]];
};

const getNeighbors = (coord: TypeCoord) => {
    const x: number = +coord.x;
    const y: number = +coord.y;

    const topCoord = y === 1 ? 0 : y - 1;
    const bottomCoord = y === FIELD_SIZE.columns ? 0 : y + 1;
    const rightCoord = x === FIELD_SIZE.rows ? 0 : x + 1;
    const leftCoord = x === 1 ? 0 : x - 1;

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
    ];
};

function getShipL(
    coord: TypeCoord,
    kx: number,
    ky: number,
    coordXEndElem: number = 0,
    coordYEndElem: number = 0,
): Array<string> {
    return [
        `${coord.y}_${coord.x}`,
        `${coord.y + ky * 1}_${coord.x + kx * 1}`,
        `${coord.y + ky * 2}_${coord.x + kx * 2}`,
        `${coordYEndElem ? coordYEndElem : coord.y + ky * 2}_${
            coordXEndElem ? coordXEndElem : coord.x + kx * 2
        }`,
    ];
}

function getShipI(coord: TypeCoord, kx: number, ky: number): Array<string> {
    return [
        `${coord.y}_${coord.x}`,
        `${coord.y + ky * 1}_${coord.x + kx * 1}`,
        `${coord.y + ky * 2}_${coord.x + kx * 2}`,
        `${coord.y + ky * 3}_${coord.x + kx * 3}`,
    ];
}

interface TypeCoord {
    y: number;
    x: number;
}

function generateRandomCoord(): TypeCoord {
    const y: number =
        Math.floor(Math.random() * (LimitsCoord.Max - LimitsCoord.Min + 1)) +
        LimitsCoord.Min;
    const x: number =
        Math.floor(Math.random() * (LimitsCoord.Max - LimitsCoord.Min + 1)) +
        LimitsCoord.Min;
    return { x, y };
}

function parseCoordinates(xy: string): TypeCoord {
    const y: number = +xy.split("_")[0];
    const x: number = +xy.split("_")[1];
    return { x, y };
}
