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
        <div className={styles.wrapper__buttons}>
            <button
                className={styles.buttons__button}
                disabled={isEndGame()}
                onClick={() => onStartGame(!runGame)}
            >
                {runGame ? "Stop game" : "Start game"}
            </button>
            <button
                className={styles.buttons__button}
                disabled={runGame}
                onClick={onGenerateNewGame}
            >
                Retry game
            </button>
        </div>
    );
};

export default Buttons;
