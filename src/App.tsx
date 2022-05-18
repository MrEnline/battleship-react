import { useState } from "react";
import styles from "./App.module.css";
import Field from "../src/components/field/Field";
import Buttons from "./components/buttons/Buttons";
import CountSteps from "../src/components/countSteps/CountSteps";
import { generateShips } from "../src/utils/Init";
import { StateCellsProp } from "./utils/Types";

const App = () => {
    const [stateCells, setStateCells] = useState<StateCellsProp>({});
    const [runGame, setRunGame] = useState(false);
    const [retryGame, setRetryGame] = useState(false);
    const [coordShips, setCoordShips] = useState<StateCellsProp>(
        generateShips(),
    );

    return (
        <div>
            <h1 className={styles.namegame}>Battleship</h1>;
            <Buttons
                runGame={runGame}
                onStartGame={setRunGame}
                stateCells={stateCells}
                setStateCells={setStateCells}
                coordShips={coordShips}
                retryGame={retryGame}
                onRetryGame={setRetryGame}
                setCoordShips={setCoordShips}
            />
            <CountSteps stateCells={stateCells} />
            <Field
                stateCells={stateCells}
                coordShips={coordShips}
                onRunGame={setRunGame}
                retryGame={retryGame}
                onRetryGame={setRetryGame}
            />
        </div>
    );
};

export default App;
