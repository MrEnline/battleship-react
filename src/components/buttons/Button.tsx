import { FC } from "react";
import { useInterval } from "../hooks/useInterval";
import { runNextStep } from "../../utils/RunNextStep";
import { DELAY } from "../../utils/Constants";
import styles from "./Button.module.css";
import { StateCellsProp } from "../../utils/Types";
import { generateShips } from "../../utils/Init";

interface TypePropsRunStopButton {
    runGame: boolean;
    onStartGame: (runGame: boolean) => void;
}

interface TypePropsRetryButton {
    retryGame: boolean;
    onRetryGame: (retryGame: boolean) => void;
    setStateCells: (obj: {}) => void;
    setCoordShips: (obj: {}) => void;
}

interface TypeProps extends TypePropsRunStopButton, TypePropsRetryButton {
    stateCells: StateCellsProp;

    coordShips: StateCellsProp;
}

const Buttons: FC<TypeProps> = ({
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

const RunStopButton: FC<TypePropsRunStopButton> = ({
    runGame,
    onStartGame,
}) => {
    return (
        <>
            <button onClick={() => onStartGame(!runGame)}>
                {runGame ? "Stop" : "Start"}
            </button>
        </>
    );
};

const RetryButton: FC<TypePropsRetryButton> = ({
    retryGame,
    onRetryGame,
    setStateCells,
    setCoordShips,
}) => {
    const handleGenerateNewGame = () => {
        onRetryGame(!retryGame);
        setStateCells({});
        setCoordShips(generateShips());
    };

    return (
        <>
            <div className={styles.resultgame}>THE GAME IS OVER</div>
            <button onClick={handleGenerateNewGame}>Retry</button>
        </>
    );
};

export default Buttons;
