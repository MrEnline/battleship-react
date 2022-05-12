import { FC } from "react";
import styles from "./Buttons.module.css";
import { generateShips } from "../../utils/Init";

interface TypesPropsRetryButton {
    retryGame: boolean;
    onRetryGame: (retryGame: boolean) => void;
    setStateCells: (obj: {}) => void;
    setCoordShips: (obj: {}) => void;
}

const RetryButton: FC<TypesPropsRetryButton> = ({
    retryGame,
    onRetryGame,
    setStateCells,
    setCoordShips,
}) => {
    const handleGenerateNewGame = () => {
        onRetryGame(!retryGame);
        setStateCells({});
        setCoordShips(generateShips());
    };

    return (
        <>
            <div className={styles.resultgame}>THE GAME IS OVER</div>
            <button onClick={handleGenerateNewGame}>Retry</button>
        </>
    );
};

export default RetryButton;
