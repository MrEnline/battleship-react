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
        for (let i = 0; i < FIELD_SIZE.columns; i++) {
            for (let j = 0; j < FIELD_SIZE.rows; j++) {
                arrItems.push(
                    <div
                        className={classNames(styles.cells, {
                            [styles.cell_color__ship]:
                                coordShips[`${i + 1}_${j + 1}`] !== undefined
                                    ? coordShips[`${i + 1}_${j + 1}`]
                                    : false,
                            [styles.cell_color__hit]:
                                stateCells[`${i + 1}_${j + 1}`] !== undefined &&
                                stateCells[`${i + 1}_${j + 1}`],
                            [styles.cell_color__miss]:
                                stateCells[`${i + 1}_${j + 1}`] !== undefined &&
                                !stateCells[`${i + 1}_${j + 1}`],
                        })}
                        key={`${i * FIELD_SIZE.columns + j + 1}`}
                        data-xy={`${i + 1}_${j + 1}`}
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
