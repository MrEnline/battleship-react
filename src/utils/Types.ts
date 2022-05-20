import { FIELD_SIZE } from "./Constants";

export interface StateCellsProp {
    [index: string]: boolean;
}

export interface TypeCoord {
    y: number;
    x: number;
}

export enum LimitsCoord {
    MaxY = FIELD_SIZE.columns,
    MaxX = FIELD_SIZE.rows,
    Min = 1,
}

export enum LimitsStateShips {
    Max = 8,
    Min = 1,
}
