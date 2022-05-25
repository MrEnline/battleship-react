import React, { useCallback, useState } from "react";
import classNames from "classnames";
import styles from "./App.module.css";
import Field from "./components/field/Field";
import Buttons from "./components/buttons/Buttons";
import generateShips from "./utils/Init";
import { StateCellsProp } from "./utils/Types";
import useInterval from "./utils/hooks/useInterval";
import runNextStep from "./utils/RunNextStep";
import { DELAY } from "./utils/Constants";

const App = () => {
    const [stateCells, setStateCells] = useState<StateCellsProp>({});
    const [runGame, setRunGame] = useState(false);
    const [coordShips, setCoordShips] = useState<StateCellsProp>(
        generateShips(),
    );

    const isEndGame = useCallback(() => {
        const coordFireShips = Object.keys(stateCells).filter(
            (value) => stateCells[value],
        );
        if (Object.keys(coordShips).length === coordFireShips.length) {
            return true;
        }
        return false;
    }, [stateCells, coordShips]);

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
        <div className={styles.wrapper}>
            <h1 className={styles.wrapper__title}>Battleship</h1>;
            <Buttons
                runGame={runGame}
                onStartGame={setRunGame}
                isEndGame={isEndGame}
                onGenerateNewGame={handleGenerateNewGame}
            />
            <div
                className={classNames(styles.wrapper__counter, {
                    [styles.wrapper__counter_endgame]: isEndGame(),
                })}
            >
                {statusGame}
            </div>
            <Field stateCells={stateCells} coordShips={coordShips} />
        </div>
    );
};

export default App;
