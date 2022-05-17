export const FIELD_SIZE = { rows: 10, columns: 10 };
export const CELL_SIZE: number = 40;
export const NUMBER_CELL_SHIPS: number = 10;
export const DELAY: number = 100;
export const MAX_COUNT_ONE_SHIP: number = 2;
export const INITIAL_SHIPS = [
    {
        count: 1,
        scheme: [
            [0, 0, 1],
            [1, 1, 1],
        ],
    },
    {
        count: 1,
        scheme: [[1, 1, 1, 1]],
    },
    {
        count: 2,
        scheme: [[1]],
    },
];
