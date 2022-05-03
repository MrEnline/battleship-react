import { FIELD_SIZE } from "./Constants";

enum Limits {
    Max = FIELD_SIZE.columns,
    Min = 1,
}

enum DirectionGeneration {
    right = 1,
    bottom,
    left,
    top,
}

export const generateShips = (generate: boolean) => {
    if (generate) {
        const coord = generateRandomCoord();
        // const route: number =
        //     Math.floor(Math.random() * (maxCoord - minCoord + 1)) + minCoord;
        let shipL = [];
        if (
            coord.y + 2 <= FIELD_SIZE.columns &&
            coord.x + 1 <= FIELD_SIZE.rows
        ) {
            shipL = [...[`${coord.y}_${coord.x}`, `${coord.y + 1}_${coord.x}`]];
        }
        return [
            ["1_1", "2_1", "3_1", "4_1", "4_2"],
            ["1_4", "2_4", "3_4", "4_4"],
            ["7_1"],
            ["9_5"],
        ];
    }
    return [];
};

interface TypeCoord {
    y: number;
    x: number;
}

function generateRandomCoord(): TypeCoord {
    const maxCoord: number = FIELD_SIZE.columns;
    const minCoord: number = 1;
    const y: number =
        Math.floor(Math.random() * (maxCoord - minCoord + 1)) + minCoord;
    const x: number =
        Math.floor(Math.random() * (maxCoord - minCoord + 1)) + minCoord;
    return { y, x };
}
