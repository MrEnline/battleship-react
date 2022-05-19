import { FC, useEffect } from "react";
import { FIELD_SIZE, CELL_SIZE } from "./../../utils/Constants";
import styles from "./Field.module.css";
import classNames from "classnames";
import { StateCellsProp } from "../../utils/Types";

interface TypesProps {
    stateCells: StateCellsProp;
    onRunGame: (obj: boolean) => void;
    endGame: boolean;
    onEndGame: (obj: boolean) => void;
    coordShips: StateCellsProp;
}

const Field: FC<TypesProps> = ({
    stateCells,
    onRunGame,
    endGame,
    onEndGame,
    coordShips,
}) => {
    const generateField = () => {
        const arrItems = [];
        for (let i = 0; i < FIELD_SIZE.columns; i++) {
            for (let j = 0; j < FIELD_SIZE.rows; j++) {
                const keyInCoordShips = `${i + 1}_${j + 1}` in coordShips;
                const keyInStateCells = `${i + 1}_${j + 1}` in stateCells;
                arrItems.push(
                    <div
                        className={classNames(styles.cells, {
                            [styles.cell_color__ship]: keyInCoordShips
                                ? coordShips[`${i + 1}_${j + 1}`]
                                : false,
                            [styles.cell_color__hit]:
                                keyInCoordShips &&
                                stateCells[`${i + 1}_${j + 1}`],
                            [styles.cell_color__miss]:
                                !keyInCoordShips && keyInStateCells,
                        })}
                        key={`${i * FIELD_SIZE.columns + j + 1}`}
                        data-xy={`${i + 1}_${j + 1}`}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    const handleCheckEndGame = () => {
        const coordFireShips = Object.keys(stateCells).filter(
            (value) => stateCells[value],
        );
        if (
            Object.keys(coordShips).length === coordFireShips.length &&
            !endGame
        ) {
            onRunGame(endGame);
            onEndGame(true);
        }
    };

    handleCheckEndGame();

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
