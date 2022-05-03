import { useState } from "react";
import Field from "../src/components/field/Field";
import { generateShips } from "../src/utils/Init";

const App = () => {
    const [stateCells, setStateCells] = useState<{}>({});
    const [coordShips, setCoordShips] = useState<Array<Array<string>>>(
        generateShips(true),
    );

    return (
        <div>
            <Field
                stateCells={stateCells}
                coordShips={coordShips}
                onChangeField={setStateCells}
            />
        </div>
    );
};

export default App;
