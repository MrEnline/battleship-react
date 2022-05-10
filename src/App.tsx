import { useState } from "react";
import Field from "../src/components/field/Field";
import Button from "../src/components/buttons/Button";
import { generateShips } from "../src/utils/Init";

interface StateCellsProp {
    [index: string]: boolean;
}

const coordShips: StateCellsProp = generateShips();

const App = () => {
    const [stateCells, setStateCells] = useState<{}>({});
    const [runGame, setRunGame] = useState(false);

    return (
        <div>
            <Button
                runGame={runGame}
                onStartGame={setRunGame}
                stateCells={stateCells}
                setStateCells={setStateCells}
                coordShips={coordShips}
            />
            <Field stateCells={stateCells} coordShips={coordShips} />
        </div>
    );
};

export default App;
