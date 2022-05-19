import { FC } from "react";
import styles from "./Buttons.module.css";
import { StateCellsProp } from "../../utils/Types";
import { generateShips } from "../../utils/Init";

interface TypesProps {
    runGame: boolean;
    onStartGame: (runGame: boolean) => void;
    endGame: boolean;
    onGenerateNewGame: () => void;
}

const Buttons: FC<TypesProps> = ({
    runGame,
    onStartGame,
    endGame,
    onGenerateNewGame,
}) => {
    return (
        <div className={styles.buttons}>
            <button disabled={endGame} onClick={() => onStartGame(!runGame)}>
                {runGame ? "Stop game" : "Start game"}
            </button>
            <button disabled={runGame} onClick={onGenerateNewGame}>
                Retry game
            </button>
        </div>
    );
};

export default Buttons;
