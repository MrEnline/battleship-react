import { FC } from "react";
import { useInterval } from "../hooks/useInterval";
import { runNextStep } from "../../utils/RunNextStep";
import { DELAY } from "../../utils/Constants";

interface TypeProps {
    runGame: boolean;
    onStartGame: (runGame: boolean) => void;
    stateCells: {};
    setStateCells: ({}) => void;
    coordShips: {};
}

const Button: FC<TypeProps> = ({ runGame, onStartGame, stateCells, setStateCells, coordShips }) => {
    
    const handleNextStep = () => {
        setStateCells(runNextStep(stateCells, coordShips));
    };

    useInterval(handleNextStep, runGame ? DELAY : null);

    return (
        <div>
            <Button onClick={() => onStartGame(!runGame)}>
                {runGame ? "Start" : "Retry"}
            </Button>
        </div>
    );
};

const RunButton: FC = () => {
    return (

    )
}

const RetryButton: FC = () => {
    return (

    )
}

export default Button;
