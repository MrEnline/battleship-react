import React, { FC } from "react";
import classNames from "classnames";
import { FIELD_SIZE, CELL_SIZE } from "./../../utils/Constants";
import styles from "./Field.module.css";
import { StateCellsProp } from "../../utils/Types";

interface TypesProps {
    stateCells: StateCellsProp;
    coordShips: StateCellsProp;
}

const Field: FC<TypesProps> = ({ stateCells, coordShips }) => {
    const xy = (i: number, j: number) => {
        return `${i + 1}_${j + 1}`;
    };

    const generateField = () => {
        const arrItems = [];
        for (let i = 0; i < FIELD_SIZE.columns; i += 1) {
            for (let j = 0; j < FIELD_SIZE.rows; j += 1) {
                arrItems.push(
                    <div
                        className={classNames(styles.cells, {
                            [styles.cell_color__ship]: xy(i, j) in coordShips,
                            [styles.cell_color__hit]:
                                xy(i, j) in coordShips && stateCells[xy(i, j)],
                            [styles.cell_color__miss]:
                                !(xy(i, j) in coordShips) &&
                                xy(i, j) in stateCells,
                        })}
                        key={`${i * FIELD_SIZE.columns + j + 1}`}
                        data-xy={xy(i, j)}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    return (
        <div>
            <div
                className={styles.field}
                style={{ width: FIELD_SIZE.columns * CELL_SIZE }}
            >
                {generateField()}
            </div>
        </div>
    );
};

export default Field;
