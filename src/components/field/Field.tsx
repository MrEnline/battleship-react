import { FC, useEffect } from "react";
import { FIELD_SIZE, CELL_SIZE } from "./../../utils/Constants";
import styles from "./Field.module.css";
import classNames from "classnames";
import { StateCellsProp } from "../../utils/Types";

interface TypesProps {
    stateCells: StateCellsProp;
    coordShips: StateCellsProp;
    onRunGame: (obj: boolean) => void;
    retryGame: boolean;
    onRetryGame: (obj: boolean) => void;
}

const Field: FC<TypesProps> = ({
    stateCells,
    coordShips,
    onRunGame,
    retryGame,
    onRetryGame,
}) => {
    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= FIELD_SIZE.columns; i++) {
            for (let j = 1; j <= FIELD_SIZE.rows; j++) {
                arrItems.push(
                    <div
                        className={classNames(styles.cells, {
                            [styles.cell_color__ship]:
                                coordShips[`${i}_${j}`] !== undefined
                                    ? coordShips[`${i}_${j}`]
                                    : false,
                            [styles.cell_color__hit]:
                                stateCells[`${i}_${j}`] !== undefined &&
                                stateCells[`${i}_${j}`],
                            [styles.cell_color__miss]:
                                stateCells[`${i}_${j}`] !== undefined &&
                                !stateCells[`${i}_${j}`],
                        })}
                        key={`${(i - 1) * FIELD_SIZE.columns + j}`}
                        data-xy={`${i}_${j}`}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    useEffect(() => {
        const coordFireShips = Object.keys(stateCells).filter(
            (value) => stateCells[value],
        );
        if (
            Object.keys(coordShips).length === coordFireShips.length &&
            !retryGame
        ) {
            onRunGame(retryGame);
            onRetryGame(!retryGame);
        }
    });

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
