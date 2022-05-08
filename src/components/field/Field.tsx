import { FC } from "react";
import {
    FIELD_SIZE,
    CELL_SIZE,
    NUMBER_CELL_SHIPS,
} from "./../../utils/Constants";
import styles from "./Field.module.css";
import classNames from "classnames";
import { generateShips } from "../../utils/Init";
import Result from "../result/Result";

interface StateCellsProp {
    [index: string]: boolean;
}

interface FieldProps {
    stateCells: StateCellsProp;
    onChangeField: (obj: {}) => void;
}

const coordShips: Array<Array<string>> = generateShips();

const Field: FC<FieldProps> = ({ stateCells, onChangeField }) => {
    const resultGame =
        Object.values(stateCells).filter((value) => value).length ===
        NUMBER_CELL_SHIPS ? (
            <Result />
        ) : null;

    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= FIELD_SIZE.columns; i++) {
            for (let j = 1; j <= FIELD_SIZE.rows; j++) {
                arrItems.push(
                    <div
                        className={classNames(styles.cells, {
                            [styles.cell_color__hit]: stateCells[`${i}_${j}`],
                            [styles.cell_color__miss]:
                                stateCells[`${i}_${j}`] !== undefined
                                    ? !stateCells[`${i}_${j}`]
                                    : false,
                        })}
                        key={`${(i - 1) * FIELD_SIZE.columns + j}`}
                        data-xy={`${i}_${j}`}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    const changeStateCell = (event: React.MouseEvent<HTMLDivElement>) => {
        if (resultGame !== null) {
            return;
        }
        const newStateCells = { ...stateCells };
        const target: HTMLDivElement = event.target as HTMLDivElement;
        const id: string = target.dataset.xy as string;
        newStateCells[id] = false;
        for (let i = 0; i < coordShips.length; i++) {
            if (coordShips[i].includes(id)) {
                newStateCells[id] = true;
            }
        }
        onChangeField(newStateCells);
    };

    return (
        <div>
            <h1 className={styles.namegame}>Battle ships</h1>
            <div className={styles.numbersteps}>
                Количество шагов: {Object.keys(stateCells).length}
            </div>
            <div
                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                    changeStateCell(event)
                }
                className={styles.field}
                style={{ width: FIELD_SIZE.columns * CELL_SIZE }}
            >
                {generateField()}
            </div>
            {resultGame}
        </div>
    );
};

export default Field;
