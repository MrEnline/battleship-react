import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Field.module.css";
import { FIELD_SIZE, CELL_SIZE } from "../../utils/Constants";
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
                        className={classNames(styles.field__cells, {
                            [styles.field__cells_ship]: xy(i, j) in coordShips,
                            [styles.field__cells_hit]:
                                xy(i, j) in coordShips && stateCells[xy(i, j)],
                            [styles.field__cells_miss]:
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
        <div
            className={styles.wrapper__field}
            style={{ width: FIELD_SIZE.columns * CELL_SIZE }}
        >
            {generateField()}
        </div>
    );
};

export default Field;
