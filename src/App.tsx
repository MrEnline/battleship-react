import { useState } from "react";
import Field from "../src/components/field/Field";

const App = () => {
    const [stateCells, setStateCells] = useState<{}>({});

    return (
        <div>
            <Field stateCells={stateCells} onChangeField={setStateCells} />
        </div>
    );
};

export default App;
