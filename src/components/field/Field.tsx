import { FC } from "react";
import { FIELD_SIZE, CELL_SIZE } from "./../../utils/Constants";
import styles from "./Field.module.css";
import classNames from "classnames";
import { generateShips } from "../../utils/Init";

interface StateCellsProp {
    [index: string]: boolean;
}

interface FieldProps {
    stateCells: StateCellsProp;
    coordShips: StateCellsProp;
}

//const coordShips: Array<Array<string>> = generateShips();
//const coordShips: Array<string> = generateShips();
//const coordShips: StateCellsProp = generateShips();

const Field: FC<FieldProps> = ({ stateCells, coordShips }) => {
    // const generateField = () => {
    //     const arrItems = [];
    //     for (let i = 1; i <= FIELD_SIZE.columns; i++) {
    //         for (let j = 1; j <= FIELD_SIZE.rows; j++) {
    //             arrItems.push(
    //                 <div
    //                     className={classNames(styles.cells, {
    //                         [styles.cell_color__ship]:
    //                             coordShips[`${i}_${j}`] !== undefined
    //                                 ? !stateCells[`${i}_${j}`]
    //                                 : false,
    //                         [styles.cell_color__hit]:
    //                             stateCells[`${i}_${j}`] !== undefined &&
    //                             coordShips[`${i}_${j}`],
    //                         [styles.cell_color__miss]:
    //                             stateCells[`${i}_${j}`] !== undefined &&
    //                             coordShips[`${i}_${j}`] === undefined,
    //                     })}
    //                     key={`${(i - 1) * FIELD_SIZE.columns + j}`}
    //                     data-xy={`${i}_${j}`}
    //                 ></div>,
    //             );
    //         }
    //     }
    //     return arrItems;
    // };

    const generateField = () => {
        const arrItems = [];
        for (let i = 1; i <= FIELD_SIZE.columns; i++) {
            for (let j = 1; j <= FIELD_SIZE.rows; j++) {
                arrItems.push(
                    <div
                        className={classNames(styles.cells, {
                            [styles.cell_color__ship]:
                                coordShips[`${i}_${j}`] !== undefined
                                    ? !stateCells[`${i}_${j}`]
                                    : false,
                            [styles.cell_color__hit]: stateCells[`${i}_${j}`],
                            [styles.cell_color__miss]: !stateCells[`${i}_${j}`],
                        })}
                        key={`${(i - 1) * FIELD_SIZE.columns + j}`}
                        data-xy={`${i}_${j}`}
                    ></div>,
                );
            }
        }
        return arrItems;
    };

    // const changeStateCell = (event: React.MouseEvent<HTMLDivElement>) => {
    //     const newStateCells = { ...stateCells };
    //     const target: HTMLDivElement = event.target as HTMLDivElement;
    //     const id: string = target.dataset.xy as string;
    //     newStateCells[id] = false;
    //     for (let i = 0; i < coordShips.length; i++) {
    //         if (coordShips[i].includes(id)) {
    //             newStateCells[id] = true;
    //         }
    //     }
    //     onChangeField(newStateCells);
    // };

    return (
        <div>
            <h1 className={styles.namegame}>Battle ships</h1>
            <div className={styles.numbersteps}>
                Number of steps: {Object.keys(stateCells).length}
            </div>
            <div
                // onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                //     changeStateCell(event)
                // }
                className={styles.field}
                style={{ width: FIELD_SIZE.columns * CELL_SIZE }}
            >
                {generateField()}
            </div>
        </div>
    );
};

export default Field;
