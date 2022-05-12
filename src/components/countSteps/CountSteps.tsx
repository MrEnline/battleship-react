import { FC } from "react";
import styles from "./CountSteps.module.css";
import { StateCellsProp } from "../../utils/Types";

interface TypesProps {
    stateCells: StateCellsProp;
}

const CountSteps: FC<TypesProps> = ({ stateCells }) => {
    return (
        <div className={styles.numbersteps}>
            Number of steps: {Object.keys(stateCells).length}
        </div>
    );
};

export default CountSteps;
