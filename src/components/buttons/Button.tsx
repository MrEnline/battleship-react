import { FC } from "react";
import { useInterval } from "../hooks/useInterval";
import { runNextStep } from "../../utils/RunNextStep";
import { DELAY } from "../../utils/Constants";
import styles from "./Buttons.module.css";
import { StateCellsProp } from "../../utils/Types";
import RetryButton from "./RetryButton";
import RunStopButton from "./RunStopButton";

interface TypesProps {
    runGame: boolean;
    onStartGame: (runGame: boolean) => void;
    retryGame: boolean;
    onRetryGame: (retryGame: boolean) => void;
    setStateCells: (obj: {}) => void;
    setCoordShips: (obj: {}) => void;
    stateCells: StateCellsProp;
    coordShips: StateCellsProp;
}

const Buttons: FC<TypesProps> = ({
    runGame,
    onStartGame,
    stateCells,
    setStateCells,
    coordShips,
    retryGame,
    onRetryGame,
    setCoordShips,
}) => {
    const handleNextStep = () => {
        setStateCells(runNextStep(stateCells, coordShips));
    };

    useInterval(handleNextStep, runGame ? DELAY : null);

    const activeButton = retryGame ? (
        <RetryButton
            retryGame={retryGame}
            onRetryGame={onRetryGame}
            setStateCells={setStateCells}
            setCoordShips={setCoordShips}
        />
    ) : (
        <RunStopButton runGame={runGame} onStartGame={onStartGame} />
    );

    return <div className={styles.buttons}>{activeButton}</div>;
};

export default Buttons;
