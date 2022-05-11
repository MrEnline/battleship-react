import { FC } from "react";
import styles from "./CountSteps.module.css";
import { StateCellsProp } from "../../utils/Types";

const CountSteps: FC<StateCellsProp> = ({ stateCells }) => {
    return (
        <div className={styles.numbersteps}>
            Number of steps: {Object.keys(stateCells).length}
        </div>
    );
};

export default CountSteps;
