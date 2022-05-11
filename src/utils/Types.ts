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

export enum LimitsDirections {
    Min = 1,
    Max = 2,
}

export enum DirectionGeneration {
    Horiz = 1,
    Vertic = 2,
}
