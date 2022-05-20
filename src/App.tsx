import React, { useCallback, useState } from "react";
import classNames from "classnames";
import styles from "./App.module.css";
import Field from "./components/field/Field";
import Buttons from "./components/buttons/Buttons";
import { generateShips } from "./src/utils/Init";
import { StateCellsProp } from "./utils/Types";
import { useInterval } from "../src/components/hooks/useInterval";
import { runNextStep } from "../src/utils/RunNextStep";
import { DELAY } from "../src/utils/Constants";

const App = () => {
    const [stateCells, setStateCells] = useState<StateCellsProp>({});
    const [runGame, setRunGame] = useState(false);
    const [coordShips, setCoordShips] = useState<StateCellsProp>(
        generateShips(),
    );

    const isEndGame = () => {
        const coordFireShips = Object.keys(stateCells).filter(
            (value) => stateCells[value],
        );
        if (Object.keys(coordShips).length === coordFireShips.length) {
            return true;
        }
        return false;
    };

    const handleNextStep = () => {
        setStateCells(runNextStep(stateCells, coordShips));
        if (isEndGame()) {
            setRunGame(false);
        }
    };

    useInterval(handleNextStep, runGame ? DELAY : null);

    const handleGenerateNewGame = useCallback(() => {
        setStateCells({});
        setCoordShips(generateShips());
    }, []);

    const statusGame = !isEndGame() ? (
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
                isEndGame={isEndGame}
                onGenerateNewGame={handleGenerateNewGame}
            />
            <div
                className={classNames(styles.counter, {
                    [styles.counter_endgame]: isEndGame(),
                })}
            >
                {statusGame}
            </div>
            <Field stateCells={stateCells} coordShips={coordShips} />
        </div>
    );
};

export default App;
