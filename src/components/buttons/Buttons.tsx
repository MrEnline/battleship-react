import React, { FC } from "react";
import styles from "./Buttons.module.css";

interface TypesProps {
    runGame: boolean;
    onStartGame: (runGame: boolean) => void;
    isEndGame: () => boolean;
    onGenerateNewGame: () => void;
}

const Buttons: FC<TypesProps> = ({
    runGame,
    onStartGame,
    isEndGame,
    onGenerateNewGame,
}) => {
    return (
        <div className={styles.buttons}>
            <button
                className={styles.button}
                disabled={isEndGame()}
                onClick={() => onStartGame(!runGame)}
            >
                {runGame ? "Stop game" : "Start game"}
            </button>
            <button
                className={styles.button}
                disabled={runGame}
                onClick={onGenerateNewGame}
            >
                Retry game
            </button>
        </div>
    );
};

export default Buttons;
