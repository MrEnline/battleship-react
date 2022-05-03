import { FC } from "react";
import { FIELD_SIZE, CELL_SIZE } from "./../../utils/Constants";
import styles from "./Field.module.css";
import classNames from "classnames";

interface StateCellsProp {
    [index: string]: boolean;
}

interface FieldProps {
    stateCells: StateCellsProp;
    coordShips: Array<Array<string>>;
    onChangeField: (obj: {}) => void;
}

const Field: FC<FieldProps> = ({ stateCells, coordShips, onChangeField }) => {
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
        <div
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                changeStateCell(event)
            }
            className={styles.field}
            style={{ width: FIELD_SIZE.columns * CELL_SIZE }}
        >
            {generateField()}
        </div>
    );
};

export default Field;
