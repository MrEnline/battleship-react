import { FC } from "react";

interface TypesPropsRunStopButton {
    runGame: boolean;
    onStartGame: (runGame: boolean) => void;
}

const RunStopButton: FC<TypesPropsRunStopButton> = ({
    runGame,
    onStartGame,
}) => {
    return (
        <>
            <button onClick={() => onStartGame(!runGame)}>
                {runGame ? "Stop" : "Start"}
            </button>
        </>
    );
};

export default RunStopButton;
