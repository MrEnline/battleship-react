import { useState } from "react";
import Field from "../src/components/field/Field";
import Buttons from "../src/components/buttons/Button";
import Header from "../src/components/header/Header";
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
            <Header />
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
