import { FIELD_SIZE } from "./Constants";

export interface StateCellsProp {
    [index: string]: boolean;
}

export interface TypeCoord {
    y: number;
    x: number;
}

export enum LimitsCoord {
    Max = FIELD_SIZE.columns,
    Min = 1,
}

export enum LimitsStateShips {
    Max = 8,
    Min = 1,
}
