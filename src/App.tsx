import { useCallback, useState } from "react";
import styles from "./App.module.css";
import Field from "../src/components/field/Field";
import Buttons from "./components/buttons/Buttons";
import { generateShips } from "../src/utils/Init";
import { StateCellsProp } from "./utils/Types";
import { useInterval } from "../src/components/hooks/useInterval";
import { runNextStep } from "../src/utils/RunNextStep";
import { DELAY } from "../src/utils/Constants";

const App = () => {
    const [stateCells, setStateCells] = useState<StateCellsProp>({});
    const [runGame, setRunGame] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [coordShips, setCoordShips] = useState<StateCellsProp>(
        generateShips(),
    );

    const handleNextStep = () => {
        setStateCells(runNextStep(stateCells, coordShips));
    };

    useInterval(handleNextStep, runGame ? DELAY : null);

    const handleGenerateNewGame = useCallback(() => {
        setEndGame(false);
        setStateCells({});
        setCoordShips(generateShips());
    }, []);

    const statusGame = !endGame ? (
        <>Number of steps: {Object.keys(stateCells).length}</>
    ) : (
        <>
            The game is over!!! Number of steps:
            {Object.keys(stateCells).length}
        </>
    );

    return (
        <div>
            <h1 className={styles.namegame}>Battleship</h1>;
            <Buttons
                runGame={runGame}
                onStartGame={setRunGame}
                endGame={endGame}
                onGenerateNewGame={handleGenerateNewGame}
            />
            <div className={styles.numbersteps}>{statusGame}</div>
            <Field
                stateCells={stateCells}
                onRunGame={setRunGame}
                endGame={endGame}
                onEndGame={setEndGame}
                coordShips={coordShips}
            />
        </div>
    );
};

export default App;
