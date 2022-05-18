import { FC } from "react";
import { useInterval } from "../hooks/useInterval";
import { runNextStep } from "../../utils/RunNextStep";
import { DELAY } from "../../utils/Constants";
import styles from "./Buttons.module.css";
import { StateCellsProp } from "../../utils/Types";
import { generateShips } from "../../utils/Init";

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

    const handleGenerateNewGame = () => {
        onRetryGame(!retryGame);
        setStateCells({});
        setCoordShips(generateShips());
    };

    const activeButton = retryGame ? (
        <>
            <div className={styles.resultgame}>THE GAME IS OVER</div>
            <button onClick={handleGenerateNewGame}>Retry</button>
        </>
    ) : (
        <button onClick={() => onStartGame(!runGame)}>
            {runGame ? "Stop" : "Start"}
        </button>
    );

    return <div className={styles.buttons}>{activeButton}</div>;
};

export default Buttons;
